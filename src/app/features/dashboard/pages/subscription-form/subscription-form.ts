import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentDto, StudentsApiService } from '@core/services/students-api.service';
import {
  SubscriptionStatus,
  SubscriptionsApiService,
} from '@core/services/subscriptions-api.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-subscription-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './subscription-form.html',
  styleUrl: '../student-form/student-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSubscriptionForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly subscriptionsApi = inject(SubscriptionsApiService);
  private readonly studentsApi = inject(StudentsApiService);

  readonly subscriptionUuid = signal<string | null>(null);
  readonly currentStudentUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly students = signal<readonly StudentDto[]>([]);
  readonly skeletonFields = [0, 1, 2, 3] as const;

  readonly form = this.fb.nonNullable.group({
    student_uuid: ['', Validators.required],
    monthly_amount: [49, [Validators.required, Validators.min(1), Validators.max(9999.99)]],
    status: this.fb.nonNullable.control<SubscriptionStatus>('active', Validators.required),
    starts_on: [this.today(), Validators.required],
  });

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    const students$ = this.studentsApi.list({ per_page: 100, sort: 'email_asc' });

    if (!uuid) {
      this.isEdit.set(false);
      students$.subscribe({
        next: (response) => this.students.set(response.data),
        error: () => this.errorMessage.set('No se pudieron cargar los alumnos.'),
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/subscriptions');
      return;
    }

    this.isEdit.set(true);
    this.subscriptionUuid.set(uuid);
    this.loading.set(true);

    forkJoin({
      subscription: this.subscriptionsApi.get(uuid),
      students: students$,
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ subscription, students }) => {
          this.students.set(students.data);
          this.currentStudentUuid.set(subscription.student.uuid);
          this.form.reset({
            student_uuid: subscription.student.uuid ?? '',
            monthly_amount: subscription.monthly_amount,
            status: subscription.status,
            starts_on: subscription.starts_on ?? this.today(),
          });
        },
        error: () => {
          this.errorMessage.set('No se pudo cargar la suscripción.');
        },
      });
  }

  availableStudents(): readonly StudentDto[] {
    const current = this.currentStudentUuid();

    return this.students().filter(
      (student) => !student.has_subscription || student.uuid === current,
    );
  }

  fieldInvalid(controlName: 'student_uuid' | 'monthly_amount' | 'starts_on'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    const payload = {
      student_uuid: raw.student_uuid,
      monthly_amount: Number(raw.monthly_amount),
      status: raw.status,
      starts_on: raw.starts_on,
    };

    const request$ =
      this.isEdit() && this.subscriptionUuid()
        ? this.subscriptionsApi.update(this.subscriptionUuid()!, payload)
        : this.subscriptionsApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        void this.router.navigateByUrl('/dashboard/subscriptions');
      },
      error: (err: { status?: number; error?: { errors?: Record<string, string[]> } }) => {
        if (err.status === 422 && err.error?.errors?.['student_id']) {
          this.errorMessage.set('Ese alumno ya tiene una suscripción.');
          return;
        }

        this.errorMessage.set(
          err.status === 422
            ? 'Revisa el alumno y la cuota mensual.'
            : 'No se pudo guardar la suscripción.',
        );
      },
    });
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }
}

import { ToastService } from '@core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppFieldError } from '@shared/components/field-error/field-error';
import { readApiError } from '@core/services/course-sessions-api.service';
import { StudentDto, StudentsApiService } from '@core/services/students-api.service';
import {
  SubscriptionStatus,
  SubscriptionsApiService,
} from '@core/services/subscriptions-api.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-subscription-form',
  imports: [ReactiveFormsModule, RouterLink, AppFieldError],
  templateUrl: './subscription-form.html',
  styleUrl: '../student-form/student-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSubscriptionForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly subscriptionsApi = inject(SubscriptionsApiService);
  private readonly studentsApi = inject(StudentsApiService);

  readonly subscriptionUuid = signal<string | null>(null);
  readonly currentStudentUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
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
        error: (err: HttpErrorResponse) => {
          this.toast.error(
            readApiError(err, 'No se pudieron cargar los alumnos.'),
          );
        },
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/suscripciones');
      return;
    }

    this.isEdit.set(true);
    this.subscriptionUuid.set(uuid);
    this.loading.set(true);
    this.loadFailed.set(false);

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
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(
            readApiError(err, 'No se pudo cargar la suscripción.'),
          );
        },
      });
  }

  availableStudents(): readonly StudentDto[] {
    const current = this.currentStudentUuid();

    return this.students().filter(
      (student) => !student.has_subscription || student.uuid === current,
    );
  }

  fieldInvalid(
    controlName: 'student_uuid' | 'monthly_amount' | 'starts_on' | 'status',
  ): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  studentError(): string {
    const control = this.form.controls.student_uuid;
    if (control.hasError('required')) {
      return 'Elige un alumno.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Elige un alumno válido.';
  }

  amountError(): string {
    const control = this.form.controls.monthly_amount;
    if (control.hasError('required')) {
      return 'La cuota mensual es obligatoria.';
    }
    if (control.hasError('min') || control.hasError('max')) {
      return 'Indica un importe entre 1 € y 9.999,99 €.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica un importe válido.';
  }

  startsOnError(): string {
    const control = this.form.controls.starts_on;
    if (control.hasError('required')) {
      return 'Indica la fecha de inicio.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica una fecha válida.';
  }

  onStudentChange(): void {
    this.clearServerError('student_uuid');
  }

  onAmountInput(): void {
    this.clearServerError('monthly_amount');
  }

  onStartsOnChange(): void {
    this.clearServerError('starts_on');
  }

  onSubmit(): void {
    if (this.availableStudents().length === 0 && !this.isEdit()) {
      this.toast.error('No quedan alumnos libres. Crea uno primero.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.clearServerError('student_uuid');
    this.clearServerError('monthly_amount');
    this.clearServerError('starts_on');

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
        this.toast.success(
          this.isEdit() ? 'Suscripción actualizada.' : 'Suscripción creada.',
        );
        void this.router.navigateByUrl('/dashboard/suscripciones');
      },
      error: (err: HttpErrorResponse) => {
        this.applyServerFieldErrors(err);
      },
    });
  }

  private applyServerFieldErrors(err: HttpErrorResponse): void {
    const errors = err.error?.errors;
    if (!errors || typeof errors !== 'object') {
      return;
    }

    const bag = errors as Record<string, unknown>;
    const fieldMap: ReadonlyArray<{
      apiKeys: readonly string[];
      control: 'student_uuid' | 'monthly_amount' | 'starts_on';
      fallback: string;
    }> = [
      {
        apiKeys: ['student_uuid', 'student_id'],
        control: 'student_uuid',
        fallback: 'Ese alumno ya tiene una suscripción.',
      },
      {
        apiKeys: ['monthly_amount'],
        control: 'monthly_amount',
        fallback: 'Indica un importe válido.',
      },
      {
        apiKeys: ['starts_on'],
        control: 'starts_on',
        fallback: 'Indica una fecha válida.',
      },
    ];

    for (const mapping of fieldMap) {
      const first = mapping.apiKeys
        .map((key) => this.firstErrorMessage(bag[key]))
        .find((message): message is string => message != null);

      if (!first) {
        continue;
      }

      const message = readApiError(
        new HttpErrorResponse({
          error: { message: first },
          status: err.status,
          statusText: err.statusText,
        }),
        mapping.fallback,
      );

      this.form.controls[mapping.control].setErrors({ server: message });
      this.form.controls[mapping.control].markAsTouched();
    }
  }

  private firstErrorMessage(value: unknown): string | null {
    const list = Array.isArray(value) ? value : value != null ? [value] : [];
    const first = list.find((item): item is string => typeof item === 'string' && item.length > 0);
    return first ?? null;
  }

  private clearServerError(
    controlName: 'student_uuid' | 'monthly_amount' | 'starts_on',
  ): void {
    const control = this.form.controls[controlName];
    if (!control.hasError('server')) {
      return;
    }

    control.updateValueAndValidity({ emitEvent: false });
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

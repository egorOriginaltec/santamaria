import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  PaymentDto,
  PaymentMethod,
  PaymentsApiService,
} from '@core/services/payments-api.service';
import { StudentCourseDto, StudentDto, StudentsApiService } from '@core/services/students-api.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-payment-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPaymentForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly paymentsApi = inject(PaymentsApiService);
  private readonly studentsApi = inject(StudentsApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly paymentUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly students = signal<readonly StudentDto[]>([]);
  readonly payment = signal<PaymentDto | null>(null);
  readonly skeletonFields = [0, 1, 2, 3] as const;

  readonly methods: readonly PaymentMethod[] = ['transfer', 'card', 'cash'];

  readonly form = this.fb.nonNullable.group({
    student_uuid: ['', Validators.required],
    course_uuid: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01), Validators.max(99999.99)]],
    method: this.fb.nonNullable.control<PaymentMethod>('transfer', Validators.required),
    paid_on: [this.toDateInput(new Date()), Validators.required],
    notes: ['', Validators.maxLength(1000)],
  });

  ngOnInit(): void {
    this.form.controls.student_uuid.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((studentUuid) => {
        const allowed = this.courseOptions().some(
          (course) => course.uuid === this.form.controls.course_uuid.value,
        );
        if (studentUuid && !allowed) {
          this.form.controls.course_uuid.setValue('');
        }
      });

    const uuid = this.route.snapshot.paramMap.get('uuid');
    const students$ = this.studentsApi.list({ per_page: 100, sort: 'email_asc' });

    if (!uuid) {
      this.isEdit.set(false);
      this.loading.set(true);
      students$.pipe(finalize(() => this.loading.set(false))).subscribe({
        next: (response) => this.students.set(response.data),
        error: () => this.errorMessage.set('No se pudieron cargar los estudiantes.'),
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/payments');
      return;
    }

    this.isEdit.set(true);
    this.paymentUuid.set(uuid);
    this.loading.set(true);

    forkJoin({
      payment: this.paymentsApi.get(uuid),
      students: students$,
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ payment, students }) => {
          this.payment.set(payment);
          this.students.set(students.data);
          this.form.reset({
            student_uuid: payment.student.uuid ?? '',
            course_uuid: payment.course.uuid ?? '',
            amount: String(payment.amount),
            method: payment.method,
            paid_on: payment.paid_on ?? this.toDateInput(new Date()),
            notes: payment.notes ?? '',
          });
        },
        error: () => {
          this.errorMessage.set('No se pudo cargar el pago.');
        },
      });
  }

  courseOptions(): readonly StudentCourseDto[] {
    const studentUuid = this.form.controls.student_uuid.value;
    const student = this.students().find((item) => item.uuid === studentUuid);
    const courses = [...(student?.courses ?? [])];
    const current = this.payment();

    if (
      current?.course.uuid &&
      current.student.uuid === studentUuid &&
      !courses.some((course) => course.uuid === current.course.uuid)
    ) {
      courses.push({
        uuid: current.course.uuid,
        title: current.course.title ?? 'Curso',
      });
    }

    return courses;
  }

  methodLabel(method: PaymentMethod): string {
    switch (method) {
      case 'transfer':
        return 'Transferencia';
      case 'card':
        return 'Tarjeta';
      case 'cash':
        return 'Efectivo';
    }
  }

  fieldInvalid(controlName: 'student_uuid' | 'course_uuid' | 'amount' | 'paid_on'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  private toDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    const raw = this.form.getRawValue();

    if (this.form.invalid || this.courseOptions().length === 0) {
      this.form.markAllAsTouched();
      if (raw.student_uuid && this.courseOptions().length === 0) {
        this.errorMessage.set('Este estudiante no está matriculado en ningún curso.');
      }
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    const payload = {
      student_uuid: raw.student_uuid,
      course_uuid: raw.course_uuid,
      amount: Number(raw.amount),
      status: 'paid' as const,
      method: raw.method,
      paid_on: raw.paid_on,
      notes: raw.notes.trim() || null,
    };

    const request$ =
      this.isEdit() && this.paymentUuid()
        ? this.paymentsApi.update(this.paymentUuid()!, payload)
        : this.paymentsApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        void this.router.navigateByUrl('/dashboard/payments');
      },
      error: (err: { status?: number }) => {
        this.errorMessage.set(
          err.status === 422
            ? 'El curso tiene que ser uno en el que el estudiante esté matriculado.'
            : 'No se pudo guardar el pago.',
        );
      },
    });
  }
}

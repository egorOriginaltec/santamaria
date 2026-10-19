import { ToastService } from '@core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
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
import { AppFieldError } from '@shared/components/field-error/field-error';
import { readApiError } from '@core/services/course-sessions-api.service';
import {
  PaymentDto,
  PaymentMethod,
  PaymentsApiService,
} from '@core/services/payments-api.service';
import { StudentCourseDto, StudentDto, StudentsApiService } from '@core/services/students-api.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-payment-form',
  imports: [ReactiveFormsModule, RouterLink, AppFieldError],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPaymentForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly paymentsApi = inject(PaymentsApiService);
  private readonly studentsApi = inject(StudentsApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly paymentUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
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
        this.clearServerError('student_uuid');
        this.clearServerError('course_uuid');

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
        error: (err: HttpErrorResponse) => {
          this.toast.error(
            readApiError(err, 'No se pudieron cargar los estudiantes.'),
          );
        },
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/pagos');
      return;
    }

    this.isEdit.set(true);
    this.paymentUuid.set(uuid);
    this.loading.set(true);
    this.loadFailed.set(false);

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
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(readApiError(err, 'No se pudo cargar el pago.'));
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

  fieldInvalid(
    controlName: 'student_uuid' | 'course_uuid' | 'amount' | 'paid_on',
  ): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  studentError(): string {
    const control = this.form.controls.student_uuid;
    if (control.hasError('required')) {
      return 'Selecciona un estudiante.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Selecciona un estudiante válido.';
  }

  courseError(): string {
    const control = this.form.controls.course_uuid;
    if (this.form.controls.student_uuid.value && this.courseOptions().length === 0) {
      return 'Este estudiante no tiene cursos asignados.';
    }
    if (control.hasError('required')) {
      return 'Selecciona un curso del estudiante.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Selecciona un curso válido.';
  }

  amountError(): string {
    const control = this.form.controls.amount;
    if (control.hasError('required')) {
      return 'El importe es obligatorio.';
    }
    if (control.hasError('min') || control.hasError('max')) {
      return 'Indica un importe entre 0,01 € y 99.999,99 €.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica un importe válido.';
  }

  paidOnError(): string {
    const control = this.form.controls.paid_on;
    if (control.hasError('required')) {
      return 'Indica la fecha del pago.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica una fecha válida.';
  }

  onCourseChange(): void {
    this.clearServerError('course_uuid');
  }

  onAmountInput(): void {
    this.clearServerError('amount');
  }

  onPaidOnChange(): void {
    this.clearServerError('paid_on');
  }

  onSubmit(): void {
    const raw = this.form.getRawValue();

    if (this.form.invalid || this.courseOptions().length === 0) {
      this.form.markAllAsTouched();
      if (raw.student_uuid && this.courseOptions().length === 0) {
        this.toast.error('Este estudiante no está matriculado en ningún curso.');
      }
      return;
    }

    this.saving.set(true);
    this.clearServerError('student_uuid');
    this.clearServerError('course_uuid');
    this.clearServerError('amount');
    this.clearServerError('paid_on');

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
        this.toast.success(this.isEdit() ? 'Pago actualizado.' : 'Pago registrado.');
        void this.router.navigateByUrl('/dashboard/pagos');
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
      control: 'student_uuid' | 'course_uuid' | 'amount' | 'paid_on';
      fallback: string;
    }> = [
      {
        apiKeys: ['student_uuid', 'student_id'],
        control: 'student_uuid',
        fallback: 'Selecciona un estudiante válido.',
      },
      {
        apiKeys: ['course_uuid', 'course_id'],
        control: 'course_uuid',
        fallback: 'El curso tiene que ser uno en el que el estudiante esté matriculado.',
      },
      {
        apiKeys: ['amount'],
        control: 'amount',
        fallback: 'Indica un importe válido.',
      },
      {
        apiKeys: ['paid_on'],
        control: 'paid_on',
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
    controlName: 'student_uuid' | 'course_uuid' | 'amount' | 'paid_on',
  ): void {
    const control = this.form.controls[controlName];
    if (!control.hasError('server')) {
      return;
    }

    control.updateValueAndValidity({ emitEvent: false });
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
}

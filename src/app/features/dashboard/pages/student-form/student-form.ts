import { ToastService } from '@core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppFieldError } from '@shared/components/field-error/field-error';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { StudentsApiService } from '@core/services/students-api.service';
import { normalizeEmail } from '@core/utils/form-sanitize.utils';
import {
  formatPhoneDisplay,
  isValidEsOrLatamPhone,
  normalizePhoneForApi,
} from '@core/utils/phone.utils';
import { finalize, forkJoin } from 'rxjs';

function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value.trim()) {
    return { required: true };
  }
  return isValidEsOrLatamPhone(value) ? null : { phone: true };
}

@Component({
  selector: 'app-dashboard-student-form',
  imports: [ReactiveFormsModule, RouterLink, AppFieldError],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStudentForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentsApi = inject(StudentsApiService);
  private readonly coursesApi = inject(CoursesApiService);

  readonly studentUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly courses = signal<readonly CourseDto[]>([]);
  readonly selectedCourseUuids = signal<readonly string[]>([]);
  readonly skeletonFields = [0, 1, 2] as const;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    phone: ['', [Validators.required, phoneValidator]],
    is_active: [true],
  });

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    const courses$ = this.coursesApi.list({ per_page: 100, sort: 'title' });

    if (!uuid) {
      this.isEdit.set(false);
      courses$.subscribe({
        next: (response) => this.courses.set(response.data),
        error: (err: HttpErrorResponse) => {
          this.toast.error(
            readApiError(err, 'No se pudieron cargar los cursos.'),
          );
        },
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/students');
      return;
    }

    this.isEdit.set(true);
    this.studentUuid.set(uuid);
    this.loading.set(true);
    this.loadFailed.set(false);

    forkJoin({
      student: this.studentsApi.get(uuid),
      courses: courses$,
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ student, courses }) => {
          this.courses.set(courses.data);
          this.selectedCourseUuids.set(student.courses.map((course) => course.uuid));
          this.form.reset({
            email: student.email,
            phone: formatPhoneDisplay(student.phone),
            is_active: student.is_active,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(
            readApiError(err, 'No se pudo cargar el estudiante.'),
          );
        },
      });
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  isCourseSelected(uuid: string): boolean {
    return this.selectedCourseUuids().includes(uuid);
  }

  toggleCourse(uuid: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedCourseUuids.update((current) =>
      checked ? [...current, uuid] : current.filter((id) => id !== uuid),
    );
  }

  fieldInvalid(controlName: 'email' | 'phone'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  emailError(): string {
    const control = this.form.controls.email;
    if (control.hasError('required')) {
      return 'El email es obligatorio.';
    }
    if (control.hasError('email') || control.hasError('maxlength')) {
      return 'Indica un email válido.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica un email válido.';
  }

  phoneError(): string {
    const control = this.form.controls.phone;
    if (control.hasError('required')) {
      return 'El teléfono es obligatorio.';
    }
    if (control.hasError('phone')) {
      return 'Teléfono de España o Latinoamérica.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica un teléfono válido.';
  }

  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\s+/g, '');
    if (cleaned !== input.value) {
      input.value = cleaned;
    }
    this.form.controls.email.setValue(cleaned, { emitEvent: false });
    this.clearServerError('email');
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = formatPhoneDisplay(input.value);
    input.value = formatted;
    this.form.controls.phone.setValue(formatted, { emitEvent: false });
    this.form.controls.phone.updateValueAndValidity({ emitEvent: false });
    this.clearServerError('phone');
  }

  onPhoneKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    this.form.patchValue({
      email: normalizeEmail(this.form.controls.email.value),
      phone: formatPhoneDisplay(this.form.controls.phone.value),
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const phone = normalizePhoneForApi(this.form.controls.phone.value);
    if (!phone) {
      this.form.controls.phone.setErrors({ phone: true });
      this.form.controls.phone.markAsTouched();
      return;
    }

    this.saving.set(true);
    this.clearServerError('email');
    this.clearServerError('phone');

    const raw = this.form.getRawValue();
    const payload = {
      email: normalizeEmail(raw.email),
      phone,
      is_active: raw.is_active,
      course_uuids: this.selectedCourseUuids(),
    };

    const request$ =
      this.isEdit() && this.studentUuid()
        ? this.studentsApi.update(this.studentUuid()!, payload)
        : this.studentsApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.toast.success(this.isEdit() ? 'Estudiante actualizado.' : 'Estudiante creado.');
        void this.router.navigateByUrl('/dashboard/students');
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

    for (const field of ['email', 'phone'] as const) {
      const value = bag[field];
      const list = Array.isArray(value) ? value : value != null ? [value] : [];
      const first = list.find((item): item is string => typeof item === 'string' && item.length > 0);

      if (!first) {
        continue;
      }

      const message = readApiError(
        new HttpErrorResponse({
          error: { message: first },
          status: err.status,
          statusText: err.statusText,
        }),
        field === 'email' ? 'Indica un email válido.' : 'Indica un teléfono válido.',
      );

      this.form.controls[field].setErrors({ server: message });
      this.form.controls[field].markAsTouched();
    }
  }

  private clearServerError(controlName: 'email' | 'phone'): void {
    const control = this.form.controls[controlName];
    if (!control.hasError('server')) {
      return;
    }

    control.updateValueAndValidity({ emitEvent: false });
  }
}


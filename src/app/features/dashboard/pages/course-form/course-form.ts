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
import { readApiError } from '@core/services/course-sessions-api.service';
import { CoursesApiService } from '@core/services/courses-api.service';
import { finalize } from 'rxjs';

function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('start_date')?.value;
  const end = group.get('end_date')?.value;
  if (!start || !end) {
    return null;
  }
  return end < start ? { dateRange: true } : null;
}

function scheduleRangeValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('schedule_start')?.value;
  const end = group.get('schedule_end')?.value;
  if (!start || !end) {
    return null;
  }
  return end <= start ? { scheduleRange: true } : null;
}

function minWeekdaysValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return Array.isArray(value) && value.length > 0 ? null : { weekdays: true };
}

export const COURSE_WEEKDAYS = [
  { id: 1, short: 'L', name: 'Lunes' },
  { id: 2, short: 'M', name: 'Martes' },
  { id: 3, short: 'X', name: 'Miércoles' },
  { id: 4, short: 'J', name: 'Jueves' },
  { id: 5, short: 'V', name: 'Viernes' },
  { id: 6, short: 'S', name: 'Sábado' },
  { id: 7, short: 'D', name: 'Domingo' },
] as const;

@Component({
  selector: 'app-dashboard-course-form',
  imports: [ReactiveFormsModule, RouterLink, AppFieldError],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCourseForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly coursesApi = inject(CoursesApiService);

  readonly courseUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly skeletonFields = [0, 1, 2, 3] as const;
  readonly weekdayOptions = COURSE_WEEKDAYS;

  readonly form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      schedule_start: ['09:00', Validators.required],
      schedule_end: ['13:00', Validators.required],
      weekdays: this.fb.nonNullable.control<number[]>([1, 2, 3, 4, 5], minWeekdaysValidator),
      price: ['49', [Validators.required, Validators.min(0.01), Validators.max(999.99)]],
      is_active: [true],
    },
    { validators: [dateRangeValidator, scheduleRangeValidator] },
  );

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.isEdit.set(false);
      const start = new Date();
      start.setDate(start.getDate() + 14);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 3);
      this.form.patchValue({
        start_date: this.toDateInput(start),
        end_date: this.toDateInput(end),
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/courses');
      return;
    }

    this.isEdit.set(true);
    this.courseUuid.set(uuid);
    this.loading.set(true);
    this.loadFailed.set(false);

    this.coursesApi
      .get(uuid)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (course) => {
          this.form.reset({
            title: course.title,
            description: course.description,
            start_date: course.start_date,
            end_date: course.end_date,
            schedule_start: course.schedule_start.slice(0, 5),
            schedule_end: course.schedule_end.slice(0, 5),
            weekdays: course.weekdays?.length ? [...course.weekdays] : [1, 2, 3, 4, 5],
            price: String(course.price ?? 49),
            is_active: course.is_active,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(readApiError(err, 'No se pudo cargar el curso.'));
        },
      });
  }

  fieldInvalid(
    controlName:
      | 'title'
      | 'description'
      | 'start_date'
      | 'end_date'
      | 'schedule_start'
      | 'schedule_end'
      | 'price',
  ): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  hasDateRangeError(): boolean {
    return this.form.hasError('dateRange') && (this.form.dirty || this.form.touched);
  }

  hasScheduleRangeError(): boolean {
    return this.form.hasError('scheduleRange') && (this.form.dirty || this.form.touched);
  }

  hasWeekdaysError(): boolean {
    const control = this.form.controls.weekdays;
    return control.invalid && (control.dirty || control.touched);
  }

  isWeekdaySelected(day: number): boolean {
    return this.form.controls.weekdays.value.includes(day);
  }

  toggleWeekday(day: number): void {
    const current = this.form.controls.weekdays.value;
    const next = current.includes(day)
      ? current.filter((item) => item !== day)
      : [...current, day].sort((left, right) => left - right);

    this.form.controls.weekdays.setValue(next);
    this.form.controls.weekdays.markAsDirty();
    this.form.controls.weekdays.markAsTouched();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    const raw = this.form.getRawValue();
    const payload = {
      title: raw.title.trim(),
      description: raw.description.trim(),
      start_date: raw.start_date,
      end_date: raw.end_date,
      schedule_start: raw.schedule_start,
      schedule_end: raw.schedule_end,
      weekdays: raw.weekdays,
      price: Number(raw.price),
      is_active: raw.is_active,
    };

    const request$ =
      this.isEdit() && this.courseUuid()
        ? this.coursesApi.update(this.courseUuid()!, payload)
        : this.coursesApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.toast.success(this.isEdit() ? 'Curso actualizado.' : 'Curso creado.');
        void this.router.navigateByUrl('/dashboard/courses');
      },
      error: () => {},
    });
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

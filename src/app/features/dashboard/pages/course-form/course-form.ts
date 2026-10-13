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

@Component({
  selector: 'app-dashboard-course-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCourseForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly coursesApi = inject(CoursesApiService);

  readonly courseUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly skeletonFields = [0, 1, 2, 3] as const;

  readonly form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      schedule_start: ['09:00', Validators.required],
      schedule_end: ['13:00', Validators.required],
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
            is_active: course.is_active,
          });
        },
        error: () => {
          this.errorMessage.set('No se pudo cargar el curso.');
        },
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

  fieldInvalid(
    controlName:
      | 'title'
      | 'description'
      | 'start_date'
      | 'end_date'
      | 'schedule_start'
      | 'schedule_end',
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    const payload = {
      title: raw.title.trim(),
      description: raw.description.trim(),
      start_date: raw.start_date,
      end_date: raw.end_date,
      schedule_start: raw.schedule_start,
      schedule_end: raw.schedule_end,
      is_active: raw.is_active,
    };

    const request$ =
      this.isEdit() && this.courseUuid()
        ? this.coursesApi.update(this.courseUuid()!, payload)
        : this.coursesApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        void this.router.navigateByUrl('/dashboard/courses');
      },
      error: (err: { status?: number }) => {
        this.errorMessage.set(
          err.status === 422
            ? 'Revisa las fechas y el horario (ej. 09:00–13:00).'
            : 'No se pudo guardar el curso.',
        );
      },
    });
  }
}

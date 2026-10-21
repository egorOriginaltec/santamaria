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
import {
  CourseDto,
  CoursePriceUnit,
  CoursesApiService,
} from '@core/services/courses-api.service';
import { finalize, switchMap, of } from 'rxjs';

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

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
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

const COVER_PRESETS = [
  '#fff0ea',
  '#f3eefe',
  '#e8f7f2',
  '#fff6e8',
  '#eef2ff',
  '#e6eefc',
  '#fff0f6',
  '#fdeee8',
  '#f0f4ff',
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
  readonly coverPresets = COVER_PRESETS;
  readonly priceUnits: readonly CoursePriceUnit[] = ['mes', 'hora'];

  readonly cardIconUrl = signal<string | null>(null);
  readonly cardIconFile = signal<File | null>(null);
  readonly cardIconPreview = signal<string | null>(null);
  readonly removeCardIcon = signal(false);
  private slugTouched = false;

  readonly form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      slug: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120), Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
      sort_order: [1, [Validators.required, Validators.min(0), Validators.max(999)]],
      age_range: [''],
      card_schedule_line: [''],
      card_summary: [''],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      schedule_start: ['09:00', Validators.required],
      schedule_end: ['13:00', Validators.required],
      weekdays: this.fb.nonNullable.control<number[]>([1, 2, 3, 4, 5], minWeekdaysValidator),
      price: ['59', [Validators.required, Validators.min(0.01), Validators.max(999.99)]],
      price_unit: this.fb.nonNullable.control<CoursePriceUnit>('mes', Validators.required),
      cover_color: ['#fff0ea', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
      show_on_landing: [true],
      is_active: [true],
    },
    { validators: [dateRangeValidator, scheduleRangeValidator] },
  );

  ngOnInit(): void {
    this.form.controls.title.valueChanges.subscribe((title) => {
      if (this.slugTouched || this.isEdit()) {
        return;
      }
      this.form.controls.slug.setValue(slugify(title), { emitEvent: false });
    });

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
      void this.router.navigateByUrl('/dashboard/cursos');
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
        next: (course) => this.patchFromCourse(course),
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(readApiError(err, 'No se pudo cargar el curso.'));
        },
      });
  }

  fieldInvalid(
    controlName:
      | 'title'
      | 'slug'
      | 'sort_order'
      | 'description'
      | 'start_date'
      | 'end_date'
      | 'schedule_start'
      | 'schedule_end'
      | 'price'
      | 'cover_color',
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

  onSlugInput(): void {
    this.slugTouched = true;
    const current = this.form.controls.slug.value;
    this.form.controls.slug.setValue(slugify(current), { emitEvent: false });
  }

  setCoverColor(color: string): void {
    this.form.controls.cover_color.setValue(color);
    this.form.controls.cover_color.markAsDirty();
  }

  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.toast.error('El icono debe ser una imagen (PNG, JPG, WEBP, SVG…).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.toast.error('El icono no puede superar 5 MB.');
      return;
    }

    this.cardIconFile.set(file);
    this.removeCardIcon.set(false);

    const reader = new FileReader();
    reader.onload = () => this.cardIconPreview.set(String(reader.result));
    reader.readAsDataURL(file);
  }

  clearIconSelection(): void {
    this.cardIconFile.set(null);
    this.cardIconPreview.set(null);
    if (this.cardIconUrl()) {
      this.removeCardIcon.set(true);
      this.cardIconUrl.set(null);
    }
  }

  previewIconSrc(): string | null {
    return this.cardIconPreview() ?? this.cardIconUrl();
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
      slug: slugify(raw.slug.trim()),
      sort_order: Number(raw.sort_order),
      age_range: raw.age_range.trim() || null,
      card_schedule_line: raw.card_schedule_line.trim() || null,
      card_summary: raw.card_summary.trim() || null,
      description: raw.description.trim(),
      start_date: raw.start_date,
      end_date: raw.end_date,
      schedule_start: raw.schedule_start,
      schedule_end: raw.schedule_end,
      weekdays: raw.weekdays,
      price: Number(raw.price),
      price_unit: raw.price_unit,
      cover_color: raw.cover_color.toLowerCase(),
      show_on_landing: raw.show_on_landing,
      is_active: raw.is_active,
    };

    const request$ =
      this.isEdit() && this.courseUuid()
        ? this.coursesApi.update(this.courseUuid()!, payload)
        : this.coursesApi.create(payload);

    request$
      .pipe(
        switchMap((response) => {
          const uuid = response.data.course.uuid;
          this.courseUuid.set(uuid);

          if (this.removeCardIcon() && this.isEdit()) {
            return this.coursesApi.deleteCardIcon(uuid).pipe(
              switchMap(() =>
                this.cardIconFile()
                  ? this.coursesApi.uploadCardIcon(uuid, this.cardIconFile()!)
                  : of(response.data.course),
              ),
            );
          }

          if (this.cardIconFile()) {
            return this.coursesApi.uploadCardIcon(uuid, this.cardIconFile()!);
          }

          return of(response.data.course);
        }),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: () => {
          this.toast.success(this.isEdit() ? 'Curso actualizado.' : 'Curso creado.');
          void this.router.navigateByUrl('/dashboard/cursos');
        },
        error: () => {},
      });
  }

  private patchFromCourse(course: CourseDto): void {
    this.slugTouched = true;
    this.cardIconUrl.set(course.card_icon_url);
    this.cardIconFile.set(null);
    this.cardIconPreview.set(null);
    this.removeCardIcon.set(false);

    this.form.reset({
      title: course.title,
      slug: course.slug ?? slugify(course.title),
      sort_order: course.sort_order || 1,
      age_range: course.age_range ?? '',
      card_schedule_line: course.card_schedule_line ?? '',
      card_summary: course.card_summary ?? '',
      description: course.description,
      start_date: course.start_date,
      end_date: course.end_date,
      schedule_start: course.schedule_start.slice(0, 5),
      schedule_end: course.schedule_end.slice(0, 5),
      weekdays: course.weekdays?.length ? [...course.weekdays] : [1, 2, 3, 4, 5],
      price: String(course.price ?? 59),
      price_unit: course.price_unit ?? 'mes',
      cover_color: course.cover_color || '#fff0ea',
      show_on_landing: course.show_on_landing,
      is_active: course.is_active,
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

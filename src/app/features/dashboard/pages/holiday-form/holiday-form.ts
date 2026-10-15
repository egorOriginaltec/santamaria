import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppFieldError } from '@shared/components/field-error/field-error';
import { readApiError } from '@core/services/course-sessions-api.service';
import { HolidaysApiService } from '@core/services/holidays-api.service';
import { ToastService } from '@core/services/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard-holiday-form',
  imports: [ReactiveFormsModule, RouterLink, AppFieldError],
  templateUrl: './holiday-form.html',
  styleUrl: './holiday-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHolidayForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly holidaysApi = inject(HolidaysApiService);
  private readonly toast = inject(ToastService);

  readonly holidayUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
  readonly skeletonFields = [0, 1] as const;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    date: ['', Validators.required],
    is_active: [true],
    notes: ['', Validators.maxLength(1000)],
  });

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.isEdit.set(false);
      this.form.patchValue({
        date: `${new Date().getFullYear()}-01-01`,
      });
      return;
    }

    if (!this.isUuid(uuid)) {
      void this.router.navigateByUrl('/dashboard/holidays');
      return;
    }

    this.isEdit.set(true);
    this.holidayUuid.set(uuid);
    this.loading.set(true);
    this.loadFailed.set(false);

    this.holidaysApi
      .get(uuid)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (holiday) => {
          this.form.reset({
            name: holiday.name,
            date: holiday.date,
            is_active: holiday.is_active,
            notes: holiday.notes ?? '',
          });
        },
        error: () => {
          this.loadFailed.set(true);
        },
      });
  }

  fieldInvalid(controlName: 'name' | 'date' | 'notes'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  nameError(): string {
    const control = this.form.controls.name;
    if (control.hasError('required')) {
      return 'El nombre es obligatorio.';
    }
    if (control.hasError('minlength') || control.hasError('maxlength')) {
      return 'Indica un nombre válido (mín. 2).';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica un nombre válido.';
  }

  dateError(): string {
    const control = this.form.controls.date;
    if (control.hasError('required')) {
      return 'La fecha es obligatoria.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica una fecha válida.';
  }

  onNameInput(): void {
    this.clearServerError('name');
  }

  onDateChange(): void {
    this.clearServerError('date');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.clearServerError('name');
    this.clearServerError('date');

    const raw = this.form.getRawValue();
    const payload = {
      name: raw.name.trim(),
      date: raw.date,
      is_active: raw.is_active,
      notes: raw.notes.trim() || null,
    };

    const request$ =
      this.isEdit() && this.holidayUuid()
        ? this.holidaysApi.update(this.holidayUuid()!, payload)
        : this.holidaysApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.toast.success(this.isEdit() ? 'Festivo actualizado.' : 'Festivo creado.');
        void this.router.navigateByUrl('/dashboard/holidays');
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
      control: 'name' | 'date';
      fallback: string;
    }> = [
      {
        apiKeys: ['name'],
        control: 'name',
        fallback: 'Indica un nombre válido.',
      },
      {
        apiKeys: ['date'],
        control: 'date',
        fallback: 'Esa fecha nacional ya existe.',
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

  private clearServerError(controlName: 'name' | 'date'): void {
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
}

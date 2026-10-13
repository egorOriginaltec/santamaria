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
import { HolidaysApiService } from '@core/services/holidays-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard-holiday-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './holiday-form.html',
  styleUrl: './holiday-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHolidayForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly holidaysApi = inject(HolidaysApiService);

  readonly holidayUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly skeletonFields = [0, 1] as const;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    date: ['', Validators.required],
    is_active: [true],
    notes: [''],
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
          this.errorMessage.set('No se pudo cargar el festivo.');
        },
      });
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  fieldInvalid(controlName: 'name' | 'date' | 'notes'): boolean {
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
      name: raw.name.trim(),
      date: raw.date,
      is_active: raw.is_active,
      notes: raw.notes.trim() || null,
    };

    const request$ = this.isEdit() && this.holidayUuid()
      ? this.holidaysApi.update(this.holidayUuid()!, payload)
      : this.holidaysApi.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        void this.router.navigateByUrl('/dashboard/holidays');
      },
      error: (err: { status?: number }) => {
        this.errorMessage.set(
          err.status === 422
            ? 'Revisa los datos. Esa fecha nacional puede existir ya.'
            : 'No se pudo guardar el festivo.',
        );
      },
    });
  }
}

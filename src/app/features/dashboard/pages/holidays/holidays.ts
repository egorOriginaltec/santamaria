import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import {
  HolidayDto,
  HolidaySort,
  HolidaysApiService,
  HolidaysListOptions,
} from '@core/services/holidays-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-dashboard-holidays',
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './holidays.html',
  styleUrl: './holidays.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHolidays implements OnInit {
  private readonly holidaysApi = inject(HolidaysApiService);
  private readonly authApi = inject(AuthApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly yearControl = new FormControl(String(new Date().getFullYear()), {
    nonNullable: true,
  });
  readonly monthControl = new FormControl('', { nonNullable: true });
  readonly activeControl = new FormControl('', { nonNullable: true });
  readonly sortControl = new FormControl<HolidaySort>('date_asc', {
    nonNullable: true,
  });
  readonly perPageControl = new FormControl('10', { nonNullable: true });

  readonly holidays = signal<readonly HolidayDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);

  readonly options = signal<HolidaysListOptions>({
    types: ['national'],
    countries: ['ES'],
    years: [
      new Date().getFullYear() - 1,
      new Date().getFullYear(),
      new Date().getFullYear() + 1,
      new Date().getFullYear() + 2,
    ],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    sorts: ['date_asc', 'date_desc', 'name'],
    per_page_options: [10, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  readonly monthLabels: readonly string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.errorMessage.set(
          'Inicia sesión como administrador para gestionar festivos.',
        );
        return;
      }

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
        ),
        this.yearControl.valueChanges,
        this.monthControl.valueChanges,
        this.activeControl.valueChanges,
        this.sortControl.valueChanges,
        this.perPageControl.valueChanges,
      )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.reload(1));
    });
  }

  reload(page = this.currentPage()): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    const yearValue = this.yearControl.value;
    const activeValue = this.activeControl.value;

    this.holidaysApi
      .list({
        search: this.searchControl.value.trim() || undefined,
        year: yearValue === 'all' ? 'all' : Number(yearValue) || new Date().getFullYear(),
        month: this.monthControl.value
          ? Number(this.monthControl.value)
          : '',
        is_active:
          activeValue === ''
            ? ''
            : activeValue === 'true',
        sort: this.sortControl.value,
        per_page: Number(this.perPageControl.value) || 10,
        page,
      })
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.initialLoad.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.holidays.set(response.data);
          this.total.set(response.meta?.total ?? response.data.length);
          this.currentPage.set(response.meta?.current_page ?? page);
          this.lastPage.set(response.meta?.last_page ?? 1);
          this.from.set(response.meta?.from ?? null);
          this.to.set(response.meta?.to ?? null);
          if (response.options) {
            this.options.set(response.options);
          }
        },
        error: (err: { status?: number }) => {
          this.holidays.set([]);
          if (err.status === 401 || err.status === 403) {
            this.errorMessage.set(
              'No tienes permiso para ver festivos. Entra con egor@gmail.com.',
            );
            return;
          }
          this.errorMessage.set('No se pudieron cargar los festivos.');
        },
      });
  }

  onDelete(holiday: HolidayDto): void {
    const ok = window.confirm(`¿Eliminar el festivo “${holiday.name}”?`);
    if (!ok) {
      return;
    }

    this.holidaysApi.destroy(holiday.uuid).subscribe({
      next: () => {
        this.successMessage.set('Festivo eliminado.');
        const nextPage =
          this.holidays().length === 1 && this.currentPage() > 1
            ? this.currentPage() - 1
            : this.currentPage();
        this.reload(nextPage);
      },
      error: () => {
        this.errorMessage.set('No se pudo eliminar el festivo.');
      },
    });
  }

  toggleActive(holiday: HolidayDto): void {
    this.holidaysApi
      .update(holiday.uuid, { is_active: !holiday.is_active })
      .subscribe({
        next: () => this.reload(this.currentPage()),
        error: () => {
          this.errorMessage.set('No se pudo actualizar el estado.');
        },
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage() || page === this.currentPage()) {
      return;
    }
    this.reload(page);
  }

  sortLabel(sort: HolidaySort): string {
    switch (sort) {
      case 'date_asc':
        return 'Fecha ↑';
      case 'date_desc':
        return 'Fecha ↓';
      case 'name':
        return 'Nombre';
    }
  }

  pageNumbers(): number[] {
    const last = this.lastPage();
    const current = this.currentPage();
    const pages: number[] = [];
    let start = Math.max(1, current - 2);
    let end = Math.min(last, start + 4);
    start = Math.max(1, end - 4);
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }
    return pages;
  }
}

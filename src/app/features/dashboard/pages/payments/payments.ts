import { DatePipe } from '@angular/common';
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import {
  PaymentDto,
  PaymentSort,
  PaymentStatus,
  PaymentsApiService,
  PaymentsListOptions,
} from '@core/services/payments-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-dashboard-payments',
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPayments implements OnInit {
  private readonly paymentsApi = inject(PaymentsApiService);
  private readonly toast = inject(ToastService);
  private readonly authApi = inject(AuthApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly sortControl = new FormControl<PaymentSort>('latest', { nonNullable: true });
  readonly perPageControl = new FormControl('15', { nonNullable: true });

  readonly payments = signal<readonly PaymentDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly authRequired = signal(false);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);

  readonly options = signal<PaymentsListOptions>({
    statuses: ['paid'],
    methods: ['transfer', 'card', 'cash'],
    sorts: ['latest', 'amount_asc', 'amount_desc'],
    per_page_options: [10, 15, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.setError('Inicia sesión como administrador para gestionar pagos.', true);
        return;
      }

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
        this.sortControl.valueChanges,
        this.perPageControl.valueChanges,
      )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.reload(1));
    });
  }

  reload(page = this.currentPage()): void {
    this.loading.set(true);
    this.clearError();

    this.paymentsApi
      .list({
        search: this.searchControl.value.trim() || undefined,
        sort: this.sortControl.value,
        per_page: Number(this.perPageControl.value) || 15,
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
          this.payments.set(response.data);
          this.total.set(response.meta?.total ?? response.data.length);
          this.currentPage.set(response.meta?.current_page ?? page);
          this.lastPage.set(response.meta?.last_page ?? 1);
          this.from.set(response.meta?.from ?? null);
          this.to.set(response.meta?.to ?? null);
          if (response.options) {
            this.options.set(response.options);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.payments.set([]);
          this.setError(
            readApiError(err, 'No se pudieron cargar los pagos.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDelete(payment: PaymentDto): void {
    const ok = window.confirm(
      `¿Eliminar el pago de ${payment.student.email ?? 'este estudiante'}?`,
    );
    if (!ok) {
      return;
    }

    this.clearError();

    this.paymentsApi.destroy(payment.uuid).subscribe({
      next: () => {
        this.toast.success('Pago eliminado.');
        const nextPage =
          this.payments().length === 1 && this.currentPage() > 1
            ? this.currentPage() - 1
            : this.currentPage();
        this.reload(nextPage);
      },
      error: (err: HttpErrorResponse) => {
        this.setError(
          readApiError(err, 'No se pudo eliminar el pago.'),
          err.status === 401 || err.status === 403,
        );
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage() || page === this.currentPage()) {
      return;
    }
    this.reload(page);
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  statusLabel(_status: PaymentStatus): string {
    return 'Pagado';
  }

  methodLabel(method: PaymentDto['method']): string {
    switch (method) {
      case 'transfer':
        return 'Transferencia';
      case 'card':
        return 'Tarjeta';
      case 'cash':
        return 'Efectivo';
    }
  }

  sortLabel(sort: PaymentSort): string {
    switch (sort) {
      case 'latest':
        return 'Recientes';
      case 'amount_asc':
        return 'Importe ↑';
      case 'amount_desc':
        return 'Importe ↓';
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

  private setError(message: string, authRequired = false): void {
    this.authRequired.set(authRequired);
    this.toast.error(message);
  }

  private clearError(): void {
    this.authRequired.set(false);
  }
}
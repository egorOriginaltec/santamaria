import { CurrencyPipe, DatePipe } from '@angular/common';
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
  SubscriptionDto,
  SubscriptionSort,
  SubscriptionStatus,
  SubscriptionsApiService,
  SubscriptionsListOptions,
} from '@core/services/subscriptions-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-dashboard-subscriptions',
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './subscriptions.html',
  styleUrl: '../students/students.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSubscriptions implements OnInit {
  private readonly subscriptionsApi = inject(SubscriptionsApiService);
  private readonly authApi = inject(AuthApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly statusControl = new FormControl('', { nonNullable: true });
  readonly sortControl = new FormControl<SubscriptionSort>('latest', {
    nonNullable: true,
  });
  readonly perPageControl = new FormControl('15', { nonNullable: true });

  readonly subscriptions = signal<readonly SubscriptionDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);

  readonly options = signal<SubscriptionsListOptions>({
    statuses: ['active', 'paused', 'cancelled'],
    sorts: ['latest', 'amount_asc', 'amount_desc'],
    per_page_options: [10, 15, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.errorMessage.set(
          'Inicia sesión como administrador para gestionar suscripciones.',
        );
        return;
      }

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
        ),
        this.statusControl.valueChanges,
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

    const statusValue = this.statusControl.value;

    this.subscriptionsApi
      .list({
        search: this.searchControl.value.trim() || undefined,
        status: statusValue === '' ? '' : (statusValue as SubscriptionStatus),
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
          this.subscriptions.set(response.data);
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
          this.subscriptions.set([]);
          if (err.status === 401 || err.status === 403) {
            this.errorMessage.set(
              'No tienes permiso para ver suscripciones. Entra con egor@gmail.com.',
            );
            return;
          }
          this.errorMessage.set('No se pudieron cargar las suscripciones.');
        },
      });
  }

  onDelete(subscription: SubscriptionDto): void {
    const email = subscription.student.email || 'este alumno';
    const ok = window.confirm(`¿Eliminar la suscripción de “${email}”?`);
    if (!ok) {
      return;
    }

    this.subscriptionsApi.destroy(subscription.uuid).subscribe({
      next: () => {
        const nextPage =
          this.subscriptions().length === 1 && this.currentPage() > 1
            ? this.currentPage() - 1
            : this.currentPage();
        this.reload(nextPage);
      },
      error: () => {
        this.errorMessage.set('No se pudo eliminar la suscripción.');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage() || page === this.currentPage()) {
      return;
    }
    this.reload(page);
  }

  sortLabel(sort: SubscriptionSort): string {
    switch (sort) {
      case 'latest':
        return 'Recientes';
      case 'amount_asc':
        return 'Cuota ↑';
      case 'amount_desc':
        return 'Cuota ↓';
    }
  }

  statusLabel(status: SubscriptionStatus): string {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'paused':
        return 'Pausada';
      case 'cancelled':
        return 'Cancelada';
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

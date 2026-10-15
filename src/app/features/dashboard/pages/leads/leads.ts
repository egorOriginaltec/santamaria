import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from '@core/services/auth-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import {
  LeadDto,
  LeadPeriod,
  LeadSort,
  LeadSource,
  LeadStatus,
  LeadsApiService,
  LeadsListOptions,
} from '@core/services/leads-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-dashboard-leads',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './leads.html',
  styleUrl: './leads.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLeads implements OnInit {
  private readonly leadsApi = inject(LeadsApiService);
  private readonly toast = inject(ToastService);
  private readonly authApi = inject(AuthApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly statusControl = new FormControl<LeadStatus | ''>('', {
    nonNullable: true,
  });
  readonly sourceControl = new FormControl<LeadSource | ''>('', {
    nonNullable: true,
  });
  readonly periodControl = new FormControl<LeadPeriod>('week', {
    nonNullable: true,
  });
  readonly sortControl = new FormControl<LeadSort>('priority', {
    nonNullable: true,
  });
  readonly perPageControl = new FormControl('10', { nonNullable: true });

  readonly leads = signal<readonly LeadDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly authRequired = signal(false);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);
  readonly updatingUuid = signal<string | null>(null);
  readonly openStatusMenuUuid = signal<string | null>(null);
  readonly options = signal<LeadsListOptions>({
    statuses: ['new', 'contacted', 'qualified', 'closed'],
    sources: ['landing', 'contact', 'website'],
    periods: ['week', 'month', 'all'],
    sorts: ['priority', 'latest'],
    per_page_options: [10, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  @HostListener('document:click')
  onDocumentClick(): void {
    this.openStatusMenuUuid.set(null);
  }

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.setError('Inicia sesión como administrador para ver los leads.', true);
        return;
      }

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
        ),
        this.statusControl.valueChanges,
        this.sourceControl.valueChanges,
        this.periodControl.valueChanges,
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
    this.openStatusMenuUuid.set(null);

    this.leadsApi
      .list({
        search: this.searchControl.value.trim() || undefined,
        status: this.statusControl.value || undefined,
        source: this.sourceControl.value || undefined,
        period: this.periodControl.value,
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
          this.leads.set(response.data);
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
          this.leads.set([]);
          this.setError(
            readApiError(err, 'No se pudieron cargar los leads.'),
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

  toggleStatusMenu(leadUuid: string, event: Event): void {
    event.stopPropagation();
    this.openStatusMenuUuid.update((current) =>
      current === leadUuid ? null : leadUuid,
    );
  }

  setStatus(lead: LeadDto, status: LeadStatus, event: Event): void {
    event.stopPropagation();
    this.openStatusMenuUuid.set(null);

    if (status === lead.status) {
      return;
    }

    this.clearError();
    this.updatingUuid.set(lead.uuid);

    this.leadsApi
      .update(lead.uuid, { status })
      .pipe(finalize(() => this.updatingUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Estado del lead actualizado.');
          this.reload(this.currentPage());
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo actualizar el estado del lead.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDelete(lead: LeadDto): void {
    const ok = window.confirm(`¿Eliminar el lead de ${lead.name}?`);
    if (!ok) {
      return;
    }

    this.clearError();
    this.updatingUuid.set(lead.uuid);

    this.leadsApi
      .destroy(lead.uuid)
      .pipe(finalize(() => this.updatingUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Lead eliminado.');
          const nextPage =
            this.leads().length === 1 && this.currentPage() > 1
              ? this.currentPage() - 1
              : this.currentPage();
          this.reload(nextPage);
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo eliminar el lead.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'new':
        return 'Nuevo';
      case 'contacted':
        return 'Contactado';
      case 'qualified':
        return 'Cualificado';
      case 'closed':
        return 'Cerrado';
      default:
        return status;
    }
  }

  sourceLabel(source: string): string {
    switch (source) {
      case 'landing':
        return 'Landing';
      case 'contact':
        return 'Contacto';
      case 'website':
        return 'Web';
      default:
        return source;
    }
  }

  periodLabel(period: LeadPeriod): string {
    switch (period) {
      case 'week':
        return 'Última semana';
      case 'month':
        return 'Último mes';
      case 'all':
        return 'Todo';
    }
  }

  sortLabel(sort: LeadSort): string {
    return sort === 'priority' ? 'Nuevos primero' : 'Más recientes';
  }

  initials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  pageNumbers(): number[] {
    const last = this.lastPage();
    const current = this.currentPage();
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(last, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    const pages: number[] = [];
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
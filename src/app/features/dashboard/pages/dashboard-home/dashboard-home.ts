import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DashboardApiService, DashboardSummary } from '@core/services/dashboard-api.service';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { DashboardEnrollmentBreakdown } from '../../components/enrollment-breakdown/enrollment-breakdown';
import { DashboardRecentStudents } from '../../components/recent-students/recent-students';
import { DashboardRevenueChart } from '../../components/revenue-chart/revenue-chart';
import {
  DashboardStatCard,
  DashboardStatsCards,
} from '../../components/stats-cards/stats-cards';

const COURSE_COLORS = ['#e7353d', '#cf2932', '#e59a1a', '#22a06b', '#0ea5e9', '#161439'];
const today = new Date();
const currentYear = today.getFullYear();

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function monthRange(date: Date): { from: string; to: string; year: string } {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  return {
    from: `${year}-${pad(month + 1)}-01`,
    to: `${year}-${pad(month + 1)}-${pad(lastDay)}`,
    year: String(year),
  };
}

const currentMonth = monthRange(today);

@Component({
  selector: 'app-dashboard-home',
  imports: [
    RouterLink,
    DashboardStatsCards,
    DashboardRevenueChart,
    DashboardRecentStudents,
    DashboardEnrollmentBreakdown,
  ],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHome implements OnInit {
  private readonly dashboardApi = inject(DashboardApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly years = Array.from({ length: 6 }, (_, index) => String(currentYear - index));
  readonly year = signal(currentMonth.year);
  readonly from = signal(currentMonth.from);
  readonly to = signal(currentMonth.to);
  readonly summary = signal<DashboardSummary | null>(null);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly skeletonStats = [0, 1, 2] as const;
  readonly skeletonMini = [0, 1, 2, 3] as const;
  readonly skeletonRows = [0, 1, 2, 3, 4] as const;

  private readonly range = computed(() => ({ from: this.from(), to: this.to() }));
  private readonly rangeChanges = toObservable(this.range);

  ngOnInit(): void {
    this.rangeChanges
      .pipe(
        switchMap(({ from, to }) => {
          if (!from || !to || from > to) {
            this.loading.set(false);
            this.initialLoad.set(false);
            this.errorMessage.set('La fecha inicial no puede ser posterior a la final.');
            return EMPTY;
          }

          this.loading.set(true);
          this.errorMessage.set(null);

          return this.dashboardApi.summary(from, to).pipe(
            finalize(() => {
              this.loading.set(false);
              this.initialLoad.set(false);
            }),
            catchError((error: HttpErrorResponse) => {
              this.errorMessage.set(
                error.status === 401 || error.status === 403
                  ? 'Inicia sesión como administrador para ver la facturación.'
                  : 'No se ha podido cargar el panel.',
              );
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((summary) => this.summary.set(summary));
  }

  setYear(year: string): void {
    this.year.set(year);
    this.from.set(`${year}-01-01`);
    this.to.set(`${year}-12-31`);
  }

  setThisMonth(): void {
    const range = monthRange(new Date());
    this.year.set(range.year);
    this.from.set(range.from);
    this.to.set(range.to);
  }

  setThisYear(): void {
    this.setYear(String(new Date().getFullYear()));
  }

  isThisMonth(): boolean {
    return this.from() === currentMonth.from && this.to() === currentMonth.to;
  }

  isThisYear(): boolean {
    const year = String(new Date().getFullYear());
    return this.from() === `${year}-01-01` && this.to() === `${year}-12-31`;
  }

  setFrom(value: string): void {
    this.from.set(value);
    this.syncYear(value, this.to());
  }

  setTo(value: string): void {
    this.to.set(value);
    this.syncYear(this.from(), value);
  }

  cards(): readonly DashboardStatCard[] {
    const summary = this.summary();
    if (!summary) {
      return [];
    }

    const due = summary.subscriptions.due;
    const paid = summary.subscriptions.paid;
    const outstanding = summary.subscriptions.outstanding;

    return [
      {
        id: 'due',
        label: 'A facturar',
        value: this.euro(due),
        hint: `${summary.subscriptions.count} suscripciones activas`,
        delta: null,
        trend: 'flat',
        accent: '#e7353d',
      },
      {
        id: 'paid',
        label: 'Cobrado',
        value: this.euro(paid),
        hint: 'Pagos del periodo',
        delta: this.delta(summary.billing.delta),
        trend: this.trend(summary.billing.delta),
        accent: '#22a06b',
      },
      {
        id: 'outstanding',
        label: 'Pendiente',
        value: this.euro(outstanding),
        hint: outstanding > 0 ? 'Falta por cobrar' : 'Periodo cubierto',
        delta: null,
        trend: outstanding > 0 ? 'down' : 'up',
        accent: '#e59a1a',
      },
    ];
  }

  courseSlices() {
    const summary = this.summary();
    if (!summary || summary.billing.paid <= 0) {
      return [];
    }

    return summary.courses.map((course, index) => ({
      title: course.title,
      paid: course.paid,
      students: course.students,
      color: COURSE_COLORS[index % COURSE_COLORS.length],
      share: `${this.percent((course.paid / summary.billing.paid) * 100)} · ${this.euro(course.paid)}`,
    }));
  }

  studentRows() {
    const summary = this.summary();
    if (!summary) {
      return [];
    }

    return summary.recent_students.map((student) => ({
      uuid: student.uuid,
      email: student.email || 'Sin email',
      courses: student.courses.length > 0 ? student.courses.join(', ') : 'Sin curso',
      joinedAt: this.formatDate(student.created_at),
      active: student.is_active,
      paid: this.euro(student.paid),
    }));
  }

  rangeLabel(): string {
    const summary = this.summary();
    if (!summary) {
      return '';
    }

    if (!summary.range.from || !summary.range.to) {
      return 'Histórico completo';
    }

    if (summary.range.from === summary.range.to) {
      return this.formatDate(summary.range.from);
    }

    return `${this.formatDate(summary.range.from)} – ${this.formatDate(summary.range.to)}`;
  }

  euro(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }

  formatDate(value: string | null): string {
    if (!value) {
      return '—';
    }

    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(year, month - 1, day));
  }

  paymentStatus(_status: string): string {
    return 'Pagado';
  }

  coverageWidth(coverage: number): string {
    return `${Math.min(100, Math.max(0, coverage))}%`;
  }

  coverageLabel(coverage: number): string {
    return `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(coverage)}%`;
  }

  private delta(value: number | null): string | null {
    if (value === null) {
      return null;
    }

    const formatted = new Intl.NumberFormat('es-ES', {
      maximumFractionDigits: 1,
    }).format(Math.abs(value));

    if (value > 0) {
      return `+${formatted}%`;
    }

    if (value < 0) {
      return `-${formatted}%`;
    }

    return '0%';
  }

  private trend(value: number | null): 'up' | 'down' | 'flat' {
    if (value === null || value === 0) {
      return 'flat';
    }

    return value > 0 ? 'up' : 'down';
  }

  private syncYear(from: string, to: string): void {
    const fromYear = from.slice(0, 4);
    if (fromYear && fromYear === to.slice(0, 4)) {
      this.year.set(fromYear);
    }
  }

  private percent(value: number): string {
    return `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(value)}%`;
  }
}

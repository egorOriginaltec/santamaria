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

const COURSE_COLORS = ['#5751e1', '#2f6fed', '#e59a1a', '#22a06b', '#e11d48', '#0ea5e9'];
const currentYear = new Date().getFullYear();

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
  readonly year = signal(String(currentYear));
  readonly from = signal(`${currentYear}-01-01`);
  readonly to = signal(`${currentYear}-12-31`);
  readonly summary = signal<DashboardSummary | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  private readonly range = computed(() => ({ from: this.from(), to: this.to() }));
  private readonly rangeChanges = toObservable(this.range);

  ngOnInit(): void {
    this.rangeChanges
      .pipe(
        switchMap(({ from, to }) => {
          if (!from || !to || from > to) {
            this.loading.set(false);
            this.errorMessage.set('La fecha inicial no puede ser posterior a la final.');
            return EMPTY;
          }

          this.loading.set(true);
          this.errorMessage.set(null);

          return this.dashboardApi.summary(from, to).pipe(
            finalize(() => this.loading.set(false)),
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

    return [
      {
        id: 'students',
        label: 'Alumnos',
        value: String(summary.students.new),
        hint: 'Altas en las fechas',
        delta: this.delta(summary.students.delta),
        trend: this.trend(summary.students.delta),
        accent: '#22a06b',
      },
      {
        id: 'paid',
        label: 'Facturado',
        value: this.euro(summary.billing.paid),
        hint: 'Cobrado en las fechas',
        delta: this.delta(summary.billing.delta),
        trend: this.trend(summary.billing.delta),
        accent: '#5751e1',
      },
      {
        id: 'leads',
        label: 'Leads',
        value: String(summary.leads.open),
        hint: 'Sin cerrar',
        delta: this.delta(summary.leads.delta),
        trend: this.trend(summary.leads.delta),
        accent: '#2f6fed',
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

  paymentStatus(status: string): string {
    switch (status) {
      case 'paid':
        return 'Pagado';
      case 'pending':
        return 'Pendiente';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
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

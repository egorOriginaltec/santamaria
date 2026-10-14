import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { finalize } from 'rxjs';

const VAT_RATE = 0.21;
const WITHHOLDING_RATE = 0.15;
const MAX_STUDENTS = 20;

export interface CalculatorLine {
  readonly course: CourseDto;
  readonly students: number;
  readonly subtotal: number;
}

@Component({
  selector: 'app-dashboard-calculator',
  imports: [RouterLink],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCalculator implements OnInit {
  private readonly coursesApi = inject(CoursesApiService);
  private readonly authApi = inject(AuthApiService);

  readonly vatRate = VAT_RATE;
  readonly withholdingRate = WITHHOLDING_RATE;
  readonly maxStudents = MAX_STUDENTS;
  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  readonly courses = signal<readonly CourseDto[]>([]);
  readonly counts = signal<Readonly<Record<string, number>>>({});
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly lines = computed<readonly CalculatorLine[]>(() => {
    const counts = this.counts();

    return this.courses().map((course) => {
      const students = counts[course.uuid] ?? 0;

      return {
        course,
        students,
        subtotal: this.round(students * course.price),
      };
    });
  });

  readonly studentTotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.students, 0),
  );

  readonly gross = computed(() =>
    this.round(this.lines().reduce((sum, line) => sum + line.subtotal, 0)),
  );

  readonly vat = computed(() => this.round(this.gross() * VAT_RATE));
  readonly withholding = computed(() => this.round(this.gross() * WITHHOLDING_RATE));
  readonly net = computed(() => this.round(this.gross() - this.vat() - this.withholding()));

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.errorMessage.set('Inicia sesión como administrador para usar la calculadora.');
        return;
      }

      this.loading.set(true);
      this.errorMessage.set(null);

      this.coursesApi
        .list({ is_active: true, per_page: 50, sort: 'title' })
        .pipe(
          finalize(() => {
            this.loading.set(false);
            this.initialLoad.set(false);
          }),
        )
        .subscribe({
          next: (response) => {
            this.courses.set(response.data);
            this.counts.set(
              Object.fromEntries(response.data.map((course) => [course.uuid, 0])),
            );
          },
          error: (err: { status?: number }) => {
            this.courses.set([]);
            this.errorMessage.set(
              err.status === 401 || err.status === 403
                ? 'No tienes permiso para ver los cursos.'
                : 'No se pudieron cargar los cursos.',
            );
          },
        });
    });
  }

  setStudents(uuid: string, value: string): void {
    this.counts.update((current) => ({
      ...current,
      [uuid]: this.clamp(value),
    }));
  }

  money(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  percent(rate: number): string {
    return `${Math.round(rate * 100)} %`;
  }

  private clamp(value: string): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return 0;
    }

    return Math.min(MAX_STUDENTS, Math.max(0, Math.round(parsed)));
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}

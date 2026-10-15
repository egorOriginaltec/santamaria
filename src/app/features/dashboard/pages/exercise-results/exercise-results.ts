import { animate, style, transition, trigger } from '@angular/animations';
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
import { AuthApiService } from '@core/services/auth-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import {
  ExerciseAttemptSort,
  ExerciseAttemptSummaryDto,
  ExerciseAttemptsApiService,
  ExerciseAttemptsListOptions,
} from '@core/services/exercise-attempts-api.service';
import { ExercisePurpose } from '@core/services/exercises-api.service';
import { debounceTime, distinctUntilChanged, finalize, merge } from 'rxjs';

@Component({
  selector: 'app-dashboard-exercise-results',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './exercise-results.html',
  styleUrl: '../payments/payments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('resultsEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate(
          '520ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'none' }),
        ),
      ]),
    ]),
  ],
})
export class DashboardExerciseResults implements OnInit {
  private readonly attemptsApi = inject(ExerciseAttemptsApiService);
  private readonly toast = inject(ToastService);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly authApi = inject(AuthApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly purposeControl = new FormControl<ExercisePurpose | ''>('', { nonNullable: true });
  readonly courseControl = new FormControl('', { nonNullable: true });
  readonly sortControl = new FormControl<ExerciseAttemptSort>('latest', { nonNullable: true });
  readonly perPageControl = new FormControl('15', { nonNullable: true });

  readonly attempts = signal<readonly ExerciseAttemptSummaryDto[]>([]);
  readonly courses = signal<readonly CourseDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly deletingUuid = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly authRequired = signal(false);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);

  readonly options = signal<ExerciseAttemptsListOptions>({
    purposes: ['practice', 'exam'],
    sorts: ['latest', 'score_asc', 'score_desc'],
    per_page_options: [10, 15, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.setError('Inicia sesión como administrador para ver resultados.', true);
        return;
      }

      this.coursesApi.list({ per_page: 100, sort: 'title' }).subscribe({
        next: (response) => this.courses.set(response.data),
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudieron cargar los cursos.'),
            err.status === 401 || err.status === 403,
          );
        },
      });

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
        this.purposeControl.valueChanges,
        this.courseControl.valueChanges,
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

    this.attemptsApi
      .list({
        search: this.searchControl.value.trim() || undefined,
        purpose: this.purposeControl.value,
        course_uuid: this.courseControl.value || undefined,
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
          this.attempts.set(response.data);
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
          this.attempts.set([]);
          this.total.set(0);
          this.setError(
            readApiError(err, 'No se pudieron cargar los resultados.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDelete(attempt: ExerciseAttemptSummaryDto): void {
    if (this.deletingUuid()) {
      return;
    }

    const who = attempt.student.email ?? attempt.student.name ?? 'este alumno';
    const ok = window.confirm(`¿Borrar el último resultado de ${who}? Podrá repetir el test.`);
    if (!ok) {
      return;
    }

    this.clearError();
    this.deletingUuid.set(attempt.uuid);

    this.attemptsApi
      .destroy(attempt.uuid)
      .pipe(finalize(() => this.deletingUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Resultado eliminado.');
          const nextPage =
            this.attempts().length === 1 && this.currentPage() > 1
              ? this.currentPage() - 1
              : this.currentPage();
          this.reload(nextPage);
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo borrar el resultado.'),
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

  scoreLabel(attempt: ExerciseAttemptSummaryDto): string {
    if (attempt.question_count <= 0) {
      return '—';
    }

    return `${attempt.correct_count}/${attempt.question_count}`;
  }

  purposeLabel(purpose: ExercisePurpose): string {
    return purpose === 'practice' ? 'Práctica' : 'Examen';
  }

  sortLabel(sort: ExerciseAttemptSort): string {
    switch (sort) {
      case 'latest':
        return 'Recientes';
      case 'score_asc':
        return 'Nota ↑';
      case 'score_desc':
        return 'Nota ↓';
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
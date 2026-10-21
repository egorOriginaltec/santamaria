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
  CourseDto,
  CourseSort,
  CourseStatusFilter,
  CoursesApiService,
  CoursesListOptions,
} from '@core/services/courses-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-dashboard-courses',
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCourses implements OnInit {
  private readonly coursesApi = inject(CoursesApiService);
  private readonly toast = inject(ToastService);
  private readonly authApi = inject(AuthApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly statusControl = new FormControl<CourseStatusFilter | ''>('', {
    nonNullable: true,
  });
  readonly activeControl = new FormControl('', { nonNullable: true });
  readonly sortControl = new FormControl<CourseSort>('start_date_asc', {
    nonNullable: true,
  });
  readonly perPageControl = new FormControl('15', { nonNullable: true });

  readonly courses = signal<readonly CourseDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly authRequired = signal(false);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);

  readonly options = signal<CoursesListOptions>({
    statuses: ['upcoming', 'past'],
    sorts: ['start_date_asc', 'start_date_desc', 'title'],
    per_page_options: [10, 15, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.setError('Inicia sesión como administrador para gestionar cursos.', true);
        return;
      }

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
        ),
        this.statusControl.valueChanges,
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
    this.clearError();

    const activeValue = this.activeControl.value;

    this.coursesApi
      .list({
        search: this.searchControl.value.trim() || undefined,
        status: this.statusControl.value || undefined,
        is_active: activeValue === '' ? '' : activeValue === 'true',
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
          this.courses.set(response.data);
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
          this.courses.set([]);
          this.setError(
            readApiError(err, 'No se pudieron cargar los cursos.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDelete(course: CourseDto): void {
    const ok = window.confirm(`¿Eliminar el curso “${course.title}”?`);
    if (!ok) {
      return;
    }

    this.clearError();

    this.coursesApi.destroy(course.uuid).subscribe({
      next: () => {
        this.toast.success('Curso eliminado.');
        const nextPage =
          this.courses().length === 1 && this.currentPage() > 1
            ? this.currentPage() - 1
            : this.currentPage();
        this.reload(nextPage);
      },
      error: (err: HttpErrorResponse) => {
        this.setError(
          readApiError(err, 'No se pudo eliminar el curso.'),
          err.status === 401 || err.status === 403,
        );
      },
    });
  }

  toggleActive(course: CourseDto): void {
    this.clearError();

    this.coursesApi
      .update(course.uuid, { is_active: !course.is_active })
      .subscribe({
        next: () => {
          this.toast.success(course.is_active ? 'Curso desactivado.' : 'Curso activado.');
          this.reload(this.currentPage());
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo actualizar el estado del curso.'),
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

  formatPrice(price: number): string {
    return (
      new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(price) + '/mes'
    );
  }

  sortLabel(sort: CourseSort): string {
    switch (sort) {
      case 'start_date_asc':
        return 'Inicio ↑';
      case 'start_date_desc':
        return 'Inicio ↓';
      case 'title':
        return 'Título';
      case 'sort_order':
        return 'Orden web';
    }
  }

  statusLabel(status: CourseStatusFilter): string {
    return status === 'upcoming' ? 'Próximos' : 'Finalizados';
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
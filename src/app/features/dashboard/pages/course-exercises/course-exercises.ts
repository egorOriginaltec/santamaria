import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { ExerciseDto, ExercisesApiService } from '@core/services/exercises-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-course-exercises',
  imports: [RouterLink],
  templateUrl: './course-exercises.html',
  styleUrl: './course-exercises.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('exercisesEnter', [
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
export class DashboardCourseExercises implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly exercisesApi = inject(ExercisesApiService);

  readonly course = signal<CourseDto | null>(null);
  readonly exercises = signal<readonly ExerciseDto[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly authRequired = signal(false);
  readonly skeletonRows = [0, 1, 2, 3, 4, 5] as const;

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.loading.set(false);
      this.setError('No se encontró el curso.');
      return;
    }

    this.loading.set(true);
    this.clearError();

    forkJoin({
      course: this.coursesApi.get(uuid),
      exercises: this.exercisesApi.listForCourse(uuid),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ course, exercises }) => {
          this.course.set(course);
          this.exercises.set(exercises.data);
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudieron cargar los ejercicios de este curso.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDelete(exercise: ExerciseDto): void {
    const course = this.course();
    if (!course) {
      return;
    }

    const ok = window.confirm(`¿Eliminar el ejercicio “${exercise.title}”?`);
    if (!ok) {
      return;
    }

    this.clearError();

    this.exercisesApi.destroy(course.uuid, exercise.uuid).subscribe({
      next: () => {
        this.toast.success('Ejercicio eliminado.');
        this.reload();
      },
      error: (err: HttpErrorResponse) => {
        this.setError(
          readApiError(err, 'No se pudo eliminar el ejercicio.'),
          err.status === 401 || err.status === 403,
        );
      },
    });
  }

  typeLabel(exercise: ExerciseDto): string {
    return exercise.type === 'code' ? 'Código' : 'A/B/C';
  }

  windowDates(exercise: ExerciseDto): string {
    return exercise.starts_on ? exercise.starts_on : 'Sin fecha';
  }

  private setError(message: string, authRequired = false): void {
    this.authRequired.set(authRequired);
    this.toast.error(message);
  }

  private clearError(): void {
    this.authRequired.set(false);
  }
}
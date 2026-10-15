import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppAlert } from '@shared/components/alert/alert';
import { ExerciseDto, ExercisesApiService } from '@core/services/exercises-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-student-exercises',
  imports: [RouterLink, AppAlert],
  templateUrl: './student-exercises.html',
  styleUrls: ['../../student-ui.css', './student-exercises.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentExercises implements OnInit {
  private readonly exercisesApi = inject(ExercisesApiService);

  readonly exercises = signal<readonly ExerciseDto[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly skeletonRows = [0, 1, 2] as const;

  ngOnInit(): void {
    this.exercisesApi
      .listForStudent()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (exercises) => this.exercises.set(exercises),
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(readApiError(err, 'No se pudieron cargar los ejercicios.'));
        },
      });
  }

  kind(exercise: ExerciseDto): string {
    return exercise.purpose === 'practice' ? 'Práctica' : 'Examen';
  }

  status(exercise: ExerciseDto): string {
    if (exercise.attempt) {
      return `${exercise.attempt.correct_count}/${exercise.attempt.question_count} aciertos`;
    }
    return exercise.open_ended ? 'Cuando quieras' : 'Abierto ahora';
  }

  cta(exercise: ExerciseDto): string {
    if (exercise.attempt && exercise.purpose === 'practice') {
      return 'Ver / repetir';
    }
    if (exercise.attempt) {
      return 'Ver resultado';
    }
    return exercise.purpose === 'practice' ? 'Hacer la práctica' : 'Hacer el examen';
  }
}

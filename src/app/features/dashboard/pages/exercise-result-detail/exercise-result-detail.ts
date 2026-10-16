import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { readApiError } from '@core/services/course-sessions-api.service';
import {
  ExerciseAttemptDetailDto,
  ExerciseAttemptsApiService,
} from '@core/services/exercise-attempts-api.service';
import { ToastService } from '@core/services/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard-exercise-result-detail',
  imports: [DatePipe, RouterLink],
  templateUrl: './exercise-result-detail.html',
  styleUrls: ['../payments/payments.css', '../exercise-results/exercise-results.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailEnter', [
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
export class DashboardExerciseResultDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly attemptsApi = inject(ExerciseAttemptsApiService);
  private readonly toast = inject(ToastService);

  readonly detail = signal<ExerciseAttemptDetailDto | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly skeletonRows = [0, 1, 2, 3, 4] as const;

  ngOnInit(): void {
    this.load();
  }

  retry(): void {
    this.load();
  }

  scoreLabel(detail: ExerciseAttemptDetailDto): string {
    if (detail.question_count <= 0) {
      return '—';
    }

    return `${detail.correct_count}/${detail.question_count}`;
  }

  purposeLabel(purpose: string): string {
    return purpose === 'practice' ? 'Práctica' : 'Examen';
  }

  isCodeAnswer(format: string | null): boolean {
    return format === 'code_write' || format === 'code_complete';
  }

  private load(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.loading.set(false);
      this.errorMessage.set('No se encontró el resultado.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.attemptsApi
      .show(uuid)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (detail) => this.detail.set(detail),
        error: (err: HttpErrorResponse) => {
          this.detail.set(null);
          const message = readApiError(err, 'No se pudo cargar el resultado.');
          this.errorMessage.set(message);
          this.toast.error(message);
        },
      });
  }
}

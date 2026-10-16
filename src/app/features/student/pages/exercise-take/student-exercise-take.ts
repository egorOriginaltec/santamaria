import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppAlert } from '@shared/components/alert/alert';
import { StudentCodeEditor } from './student-code-editor';
import { readApiError } from '@core/services/course-sessions-api.service';
import {
  ExerciseChoiceKey,
  ExerciseDto,
  ExerciseQuestionDto,
  ExercisesApiService,
  SubmitAttemptPayload,
} from '@core/services/exercises-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-student-exercise-take',
  imports: [RouterLink, StudentCodeEditor, AppAlert],
  templateUrl: './student-exercise-take.html',
  styleUrls: ['../../student-ui.css', '../exercises/student-exercises.css', './student-exercise-take.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentExerciseTake implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly exercisesApi = inject(ExercisesApiService);
  private readonly document = inject(DOCUMENT);

  readonly exercise = signal<ExerciseDto | null>(null);
  readonly answers = signal<Readonly<Record<string, ExerciseChoiceKey | ''>>>({});
  readonly codes = signal<Readonly<Record<string, string>>>({});
  readonly checks = signal<Readonly<Record<string, boolean | null>>>({});
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly retrying = signal(false);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  retry(): void {
    this.load();
  }

  private load(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.loading.set(false);
      this.showError('No se encontró el ejercicio.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);
    this.exercisesApi
      .getForStudent(uuid)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (exercise) => this.bind(exercise),
        error: (err: HttpErrorResponse) => {
          this.showError(readApiError(err, 'Este ejercicio no está disponible ahora.'));
        },
      });
  }

  isPractice(): boolean {
    return true;
  }

  viewingResults(): boolean {
    return this.exercise()?.attempt != null && !this.retrying();
  }

  canRetry(): boolean {
    const exercise = this.exercise();
    return exercise?.attempt != null && exercise.is_published !== false;
  }

  canAnswer(): boolean {
    if (this.saving() || this.viewingResults()) {
      return false;
    }

    return this.exercise() != null;
  }

  isCodeQuestion(question: ExerciseQuestionDto): boolean {
    return question.format === 'code_write' || question.format === 'code_complete';
  }

  codePlaceholder(question: ExerciseQuestionDto): string {
    if (question.format === 'code_complete' && (this.codeOf(question.uuid) || question.starter_code)) {
      return '';
    }

    return 'Escribe el código aquí…';
  }

  isCodeExercise(): boolean {
    return this.exercise()?.type === 'code';
  }

  revealsLive(): boolean {
    return this.exercise()?.reveal_on === 'after_choice';
  }

  showsFeedback(questionUuid: string): boolean {
    if (this.viewingResults()) {
      return true;
    }

    return this.revealsLive() && this.selected(questionUuid) !== '';
  }

  lead(): string {
    const exercise = this.exercise();
    if (!exercise) {
      return '';
    }

    if (this.viewingResults() && exercise.attempt) {
      const score = `Entregado · ${exercise.attempt.correct_count} de ${exercise.attempt.question_count} aciertos`;
      return this.canRetry()
        ? `${score}. Puedes repetirlo: se guarda solo el último intento.`
        : score;
    }

    if (this.isCodeExercise()) {
      return 'Escribe el código y pulsa Entregar. Se corrige al entregar y verás si acertaste y la solución. Puedes repetirlo.';
    }

    if (exercise.reveal_on === 'after_choice') {
      return 'Elige A, B o C. En cuanto marques una, verás si acertaste. Puedes repetirlo.';
    }

    return 'Elige A, B o C. Las respuestas las verás al entregar. Puedes repetirlo.';
  }

  pick(questionUuid: string, key: ExerciseChoiceKey): void {
    if (!this.canAnswer()) {
      return;
    }

    this.answers.update((current) => ({ ...current, [questionUuid]: key }));
  }

  selected(questionUuid: string): ExerciseChoiceKey | '' {
    return this.answers()[questionUuid] ?? '';
  }

  codeOf(questionUuid: string): string {
    return this.codes()[questionUuid] ?? '';
  }

  setCode(questionUuid: string, value: string): void {
    if (!this.canAnswer()) {
      return;
    }

    this.codes.update((current) => ({ ...current, [questionUuid]: value }));
    this.checks.update((current) => ({ ...current, [questionUuid]: null }));
  }

  checkResult(questionUuid: string): boolean | null {
    return this.checks()[questionUuid] ?? null;
  }

  startRetry(): void {
    const exercise = this.exercise();
    if (!exercise || !this.canRetry() || this.saving()) {
      return;
    }

    const next: Record<string, ExerciseChoiceKey | ''> = {};
    const codes: Record<string, string> = {};
    for (const question of exercise.questions ?? []) {
      next[question.uuid] = '';
      codes[question.uuid] = this.starterOf(question);
    }

    this.retrying.set(true);
    this.errorMessage.set(null);
    this.answers.set(next);
    this.codes.set(codes);
    this.checks.set({});
  }

  onSubmit(): void {
    const exercise = this.exercise();
    if (!exercise || !this.canAnswer()) {
      return;
    }

    const questions = exercise.questions ?? [];
    const answers: SubmitAttemptPayload['answers'][number][] = [];

    for (const question of questions) {
      if (this.isCodeQuestion(question)) {
        const code = this.codeOf(question.uuid);
        if (code.trim()) {
          answers.push({ question_uuid: question.uuid, code });
        }
        continue;
      }

      const choice = this.selected(question.uuid);
      if (choice) {
        answers.push({ question_uuid: question.uuid, choice });
      }
    }

    if (answers.length !== questions.length) {
      this.showError(
        this.isCodeExercise()
          ? 'Escribe el código de todas las preguntas antes de entregar.'
          : 'Responde todas las preguntas antes de entregar.',
      );
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    this.exercisesApi
      .submitAttempt(exercise.uuid, { answers })
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (response) => this.bind(response.data.exercise),
        error: (err: HttpErrorResponse) => {
          this.showError(readApiError(err, 'No se pudo entregar el ejercicio.'));
        },
      });
  }

  private showError(message: string): void {
    this.errorMessage.set(message);
    this.document.defaultView?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  private starterOf(question: ExerciseQuestionDto): string {
    if (question.format !== 'code_complete' || !question.starter_code) {
      return '';
    }

    return question.starter_code.endsWith('\n') ? question.starter_code : `${question.starter_code}\n`;
  }

  private bind(exercise: ExerciseDto): void {
    this.retrying.set(false);
    this.exercise.set(exercise);
    const next: Record<string, ExerciseChoiceKey | ''> = {};
    const codes: Record<string, string> = {};
    const checks: Record<string, boolean | null> = {};
    for (const question of exercise.questions ?? []) {
      const saved = exercise.attempt?.answers?.find((answer) => answer.question_uuid === question.uuid);
      next[question.uuid] = saved?.choice ?? '';
      codes[question.uuid] = saved?.code || this.starterOf(question);
      checks[question.uuid] = saved ? saved.is_correct : null;
    }
    this.answers.set(next);
    this.codes.set(codes);
    this.checks.set(checks);
  }
}

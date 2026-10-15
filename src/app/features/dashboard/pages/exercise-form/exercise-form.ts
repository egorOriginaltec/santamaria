import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoursesApiService } from '@core/services/courses-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import {
  ExerciseChoiceKey,
  ExerciseDto,
  ExercisePayload,
  ExercisePurpose,
  ExerciseQuestionFormat,
  ExerciseRevealOn,
  ExerciseType,
  ExercisesApiService,
} from '@core/services/exercises-api.service';
import { ToastService } from '@core/services/toast.service';
import { TimeoutError, finalize, timeout } from 'rxjs';

type EditorMode = 'manual' | 'prompt';

export const PROMPT_LEAD = 'Genera un test A/B/C SOLO sobre este texto (no uses el tema del curso):';
export const CODE_PROMPT_LEAD =
  'Genera ejercicios de CÓDIGO (cualquier lenguaje) según este texto; no uses el nombre del curso para elegir el lenguaje:';
export const QUESTION_MAX = 100;
export const QUESTION_MIN = 1;

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${now.getFullYear()}-${month}-${day}`;
}

@Component({
  selector: 'app-dashboard-exercise-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './exercise-form.html',
  styleUrl: './exercise-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardExerciseForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly exercisesApi = inject(ExercisesApiService);
  private readonly toast = inject(ToastService);

  readonly courseUuid = signal<string | null>(null);
  readonly courseTitle = signal('');
  readonly exerciseUuid = signal<string | null>(null);
  readonly isEdit = signal(false);
  readonly mode = signal<EditorMode>('manual');
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
  readonly keys: readonly ExerciseChoiceKey[] = ['A', 'B', 'C'];
  readonly questionMax = QUESTION_MAX;
  readonly purpose = signal<ExercisePurpose>('practice');
  readonly exerciseType = signal<ExerciseType>('multiple_choice');

  readonly form = this.fb.nonNullable.group({
    type: ['multiple_choice' as ExerciseType],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(160)]],
    starts_on: [todayIso(), Validators.required],
    is_published: [false],
    purpose: ['practice' as ExercisePurpose],
    reveal_on: ['after_choice' as ExerciseRevealOn],
    prompt: [''],
    language: ['', [Validators.maxLength(32)]],
    count: [5, [Validators.min(QUESTION_MIN), Validators.max(QUESTION_MAX)]],
    questions: this.fb.array([this.questionGroup()]),
  });

  get questions(): FormArray {
    return this.form.controls.questions;
  }

  ngOnInit(): void {
    const courseUuid = this.route.snapshot.paramMap.get('uuid');
    const exerciseUuid = this.route.snapshot.paramMap.get('exerciseUuid');

    if (!courseUuid) {
      this.loading.set(false);
      this.loadFailed.set(true);
      this.toast.error('No se encontró el curso.');
      return;
    }

    this.courseUuid.set(courseUuid);

    this.coursesApi.get(courseUuid).subscribe({
      next: (course) => this.courseTitle.set(course.title),
      error: (err: HttpErrorResponse) => {
        this.courseTitle.set('Curso');
        if (err.status === 404) {
          this.loadFailed.set(true);
          this.toast.error(readApiError(err, 'No se encontró el curso.'));
        }
      },
    });

    if (!exerciseUuid) {
      this.isEdit.set(false);
      this.loading.set(false);
      return;
    }

    this.isEdit.set(true);
    this.mode.set('manual');
    this.exerciseUuid.set(exerciseUuid);
    this.loadFailed.set(false);

    this.exercisesApi
      .getForCourse(courseUuid, exerciseUuid)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (exercise) => this.patchExercise(exercise),
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(readApiError(err, 'No se pudo cargar el ejercicio.'));
        },
      });
  }

  isCode(): boolean {
    return this.exerciseType() === 'code';
  }

  setExerciseType(type: ExerciseType): void {
    if (this.isEdit()) {
      return;
    }

    this.exerciseType.set(type);
    this.form.controls.type.setValue(type);
  }

  promptLeadText(): string {
    return this.isCode() ? CODE_PROMPT_LEAD : PROMPT_LEAD;
  }

  setQuestionFormat(index: number, format: ExerciseQuestionFormat): void {
    this.questions.at(index).patchValue({ format });
  }

  isPractice(): boolean {
    return true;
  }

  setMode(mode: EditorMode): void {
    if (this.isEdit()) {
      return;
    }
    this.mode.set(mode);

    if (mode !== 'manual' || !this.isCode()) {
      return;
    }

    const language = this.form.controls.language.value.trim();
    if (language === '') {
      return;
    }

    for (const group of this.questions.controls) {
      if (String(group.get('language')?.value ?? '').trim() === '') {
        group.patchValue({ language });
      }
    }
  }

  addQuestion(): void {
    if (this.questions.length >= QUESTION_MAX) {
      this.toast.error('El ejercicio puede tener como máximo 100 preguntas.');
      return;
    }
    this.questions.push(this.questionGroup('', 'A', '', '', '', 'code_write', '', '', this.defaultLanguage()));
  }

  removeQuestion(index: number): void {
    if (this.questions.length <= 1) {
      return;
    }
    this.questions.removeAt(index);
  }

  listPath(): string[] {
    return ['/dashboard/courses', this.courseUuid() ?? '', 'exercises'];
  }

  onSubmit(): void {
    const courseUuid = this.courseUuid();
    if (!courseUuid || this.saving()) {
      return;
    }

    if (this.mode() === 'prompt' && !this.isEdit()) {
      this.generate(courseUuid);
      return;
    }

    this.saveManual(courseUuid);
  }

  private generate(courseUuid: string): void {
    const notes = this.form.controls.prompt.value.trim();
    if (notes.length < 20) {
      this.form.controls.prompt.markAsTouched();
      this.toast.error('Pega debajo el temario, apuntes o lo que tienen que practicar.');
      return;
    }

    if (this.form.controls.starts_on.invalid) {
      this.form.controls.starts_on.markAsTouched();
      this.toast.error('Pon la fecha de inicio del ejercicio.');
      return;
    }

    const count = Math.trunc(Number(this.form.controls.count.value));
    if (!Number.isFinite(count) || count < QUESTION_MIN || count > QUESTION_MAX) {
      this.form.controls.count.markAsTouched();
      this.toast.error('El test puede tener entre 1 y 100 preguntas.');
      return;
    }

    const prompt = `${this.promptLeadText()}\n\n${notes}`;

    this.saving.set(true);

    this.exercisesApi
      .generate(courseUuid, {
        prompt,
        count,
        title: this.form.controls.title.value.trim() || null,
        starts_on: this.form.controls.starts_on.value,
        ends_on: null,
        is_published: this.form.controls.is_published.value,
        purpose: 'practice',
        reveal_on: this.form.controls.reveal_on.value,
        type: this.form.controls.type.value,
        language: this.blankToNull(this.form.controls.language.value),
      })
      .pipe(
        timeout(count > 10 ? 11 * 60 * 1000 : 90_000),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: (response) => {
          this.toast.success('Borrador generado.');
          void this.router.navigate([
            '/dashboard/courses',
            courseUuid,
            'exercises',
            response.data.exercise.uuid,
            'edit',
          ]);
        },
        error: (err: unknown) => {
          if (err instanceof TimeoutError || !(err instanceof HttpErrorResponse)) {
            this.toast.error(this.generateError(err));
          }
        },
      });
  }

  private saveManual(courseUuid: string): void {
    this.form.controls.title.markAsTouched();
    this.form.controls.starts_on.markAsTouched();
    this.questions.controls.forEach((group) => group.markAllAsTouched());

    if (this.form.controls.title.invalid) {
      this.toast.error('Pon un título al ejercicio.');
      return;
    }

    if (this.form.controls.starts_on.invalid) {
      this.toast.error('Pon la fecha de inicio del ejercicio.');
      return;
    }

    if (this.isCode() && !this.codeQuestionsValid()) {
      this.toast.error('Cada pregunta de código necesita enunciado, lenguaje y al menos una solución.');
      return;
    }

    if (!this.isCode() && this.questions.invalid) {
      this.toast.error('Revisa el título y que cada pregunta tenga enunciado, A/B/C y una correcta.');
      return;
    }

    const payload = this.toPayload();
    this.saving.set(true);

    const request$ = this.isEdit() && this.exerciseUuid()
      ? this.exercisesApi.update(courseUuid, this.exerciseUuid()!, payload)
      : this.exercisesApi.create(courseUuid, payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.toast.success(this.isEdit() ? 'Ejercicio actualizado.' : 'Ejercicio creado.');
        void this.router.navigate(this.listPath());
      },
      error: () => {},
    });
  }

  private toPayload(): ExercisePayload {
    const raw = this.form.getRawValue();

    return {
      title: raw.title.trim(),
      type: raw.type,
      starts_on: raw.starts_on,
      ends_on: null,
      is_published: raw.is_published,
      purpose: 'practice',
      reveal_on: raw.reveal_on,
      questions: raw.questions.map((question) =>
        raw.type === 'code'
          ? {
              prompt: question.prompt.trim(),
              format: question.format,
              language: question.language.trim(),
              starter_code:
                question.format === 'code_complete' ? question.starter_code : null,
              accepted_answers: question.accepted_answers,
            }
          : {
              prompt: question.prompt.trim(),
              correct_key: question.correct_key,
              choices: this.keys.map((key) => ({
                key,
                label: question[key].trim(),
              })),
            },
      ),
    };
  }

  private patchExercise(exercise: ExerciseDto): void {
    this.questions.clear();
    const questions = exercise.questions ?? [];

    if (questions.length === 0) {
      this.questions.push(this.questionGroup());
    } else {
      for (const question of questions) {
        const byKey = Object.fromEntries(question.choices.map((choice) => [choice.key, choice.label]));
        this.questions.push(
          this.questionGroup(
            question.prompt,
            (question.correct_key ?? 'A') as ExerciseChoiceKey,
            String(byKey['A'] ?? ''),
            String(byKey['B'] ?? ''),
            String(byKey['C'] ?? ''),
            (question.format === 'code_complete' ? 'code_complete' : 'code_write') as ExerciseQuestionFormat,
            question.starter_code ?? '',
            (question.accepted_answers ?? []).join('\n---\n'),
            question.language ?? '',
          ),
        );
      }
    }

    const type = exercise.type ?? 'multiple_choice';
    this.purpose.set('practice');
    this.exerciseType.set(type);
    this.form.patchValue({
      type,
      title: exercise.title,
      starts_on: exercise.starts_on ?? todayIso(),
      is_published: exercise.is_published,
      purpose: 'practice',
      reveal_on: exercise.reveal_on ?? 'after_choice',
      prompt: this.stripPromptLead(exercise.prompt ?? ''),
      language: questions[0]?.language ?? '',
    });
  }

  private questionGroup(
    prompt = '',
    correct: ExerciseChoiceKey = 'A',
    a = '',
    b = '',
    c = '',
    format: ExerciseQuestionFormat = 'code_write',
    starter = '',
    accepted = '',
    language = '',
  ) {
    return this.fb.nonNullable.group({
      prompt: [prompt, [Validators.required, Validators.minLength(4)]],
      correct_key: [correct, Validators.required],
      A: [a, [Validators.required, Validators.minLength(1)]],
      B: [b, [Validators.required, Validators.minLength(1)]],
      C: [c, [Validators.required, Validators.minLength(1)]],
      format: [format],
      language: [language, [Validators.maxLength(32)]],
      starter_code: [starter],
      accepted_answers: [accepted],
    });
  }

  private codeQuestionsValid(): boolean {
    return this.questions.controls.every((group) => {
      const value = group.getRawValue();
      if (value.prompt.trim().length < 4 || value.language.trim() === '' || value.accepted_answers.trim() === '') {
        return false;
      }

      return value.format !== 'code_complete' || value.starter_code.trim() !== '';
    });
  }

  private generateError(err: unknown): string {
    if (err instanceof TimeoutError) {
      return 'La generación está tardando demasiado. Prueba con menos preguntas o vuelve a intentarlo.';
    }

    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'No hay conexión con el API. ¿Está levantado Laravel?';
      }

      return readApiError(err, 'No se pudo generar el test. Inténtalo de nuevo.');
    }

    return 'No se pudo generar el test. Inténtalo de nuevo.';
  }

  private defaultLanguage(): string {
    const fromForm = this.form.controls.language.value.trim();
    if (fromForm !== '') {
      return fromForm;
    }

    if (this.questions.length === 0) {
      return '';
    }

    return String(this.questions.at(this.questions.length - 1).get('language')?.value ?? '').trim();
  }

  private stripPromptLead(prompt: string): string {
    return prompt
      .replace(new RegExp(`^${PROMPT_LEAD}\\s*`, 'i'), '')
      .replace(new RegExp(`^${CODE_PROMPT_LEAD}\\s*`, 'i'), '')
      .trim();
  }

  private blankToNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }
}

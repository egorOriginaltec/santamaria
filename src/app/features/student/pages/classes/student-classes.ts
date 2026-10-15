import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppAlert } from '@shared/components/alert/alert';
import { CalendarExerciseDto } from '@core/services/course-sessions-api.service';
import {
  ContentMaterialDto,
  StudentContentCourseDto,
  StudentContentService,
} from '../../data/student-content.service';
import { studentContentEnter } from '../../student-enter.animation';
import { WEEKDAYS_LONG, formatNice } from '../../student-schedule';

@Component({
  selector: 'app-student-classes',
  imports: [RouterLink, AppAlert],
  templateUrl: './student-classes.html',
  styleUrls: ['../../student-ui.css', './student-classes.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [studentContentEnter],
})
export class StudentClasses {
  private readonly content = inject(StudentContentService);

  readonly loading = this.content.loading;
  readonly errorMessage = this.content.error;
  readonly courses = this.content.courses;
  readonly downloadError = signal<string | null>(null);
  readonly downloadingUuid = signal<string | null>(null);
  readonly skeletonRows = [0, 1, 2] as const;

  readonly empty = computed(() => !this.loading() && this.courses().length === 0);

  constructor() {
    this.content.ensure();
  }

  retry(): void {
    this.content.reload().subscribe();
  }

  courseMeta(course: StudentContentCourseDto): string {
    const days = formatClassDays(course.weekdays);
    if (!course.schedule_start || !course.schedule_end) {
      return days ? `Clase ${days}` : '';
    }

    if (!days) {
      return `${course.schedule_start}–${course.schedule_end}`;
    }

    return `Clase ${days}, de ${course.schedule_start} a ${course.schedule_end}`;
  }

  fileMeta(file: ContentMaterialDto): string {
    const when = file.session_on ? `Clase del ${formatNice(file.session_on)}` : 'Del curso';
    return `${when} · ${formatBytes(file.size)}`;
  }

  testKind(exercise: CalendarExerciseDto): string {
    return 'Ejercicio';
  }

  testMeta(exercise: CalendarExerciseDto): string {
    const parts: string[] = [];

    if (exercise.attempt) {
      parts.push(
        `Hecho · ${exercise.attempt.correct_count} de ${exercise.attempt.question_count} aciertos`,
      );
    } else if (exercise.question_count != null) {
      parts.push(
        exercise.question_count === 1 ? '1 pregunta' : `${exercise.question_count} preguntas`,
      );
    }

    if (exercise.attempt) {
      return parts.join(' · ');
    }

    if (exercise.starts_on) {
      parts.push(`Calendario: ${formatNice(exercise.starts_on)}`);
    }

    return parts.join(' · ');
  }

  testCta(exercise: CalendarExerciseDto): string {
    return exercise.attempt ? 'Repetir' : 'Hacer';
  }

  isPrimaryCta(exercise: CalendarExerciseDto): boolean {
    return !exercise.attempt;
  }

  download(material: ContentMaterialDto): void {
    this.downloadError.set(null);
    this.downloadingUuid.set(material.uuid);
    this.content.download(material).subscribe({
      next: () => this.downloadingUuid.set(null),
      error: () => {
        this.downloadingUuid.set(null);
        this.downloadError.set('No se pudo descargar el archivo.');
      },
    });
  }
}

function formatClassDays(weekdays: readonly number[] | undefined): string {
  const days = [...new Set((weekdays ?? []).filter((day) => day >= 1 && day <= 7))].sort(
    (a, b) => a - b,
  );

  if (days.length === 0) {
    return '';
  }

  if (days.length === 5 && days.join() === '1,2,3,4,5') {
    return 'de lunes a viernes';
  }

  const names = days.map((day) => WEEKDAYS_LONG[day - 1]);

  if (names.length === 1) {
    return `los ${names[0]}`;
  }

  if (names.length === 2) {
    return `los ${names[0]} y ${names[1]}`;
  }

  return `los ${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    const kb = bytes / 1024;
    return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

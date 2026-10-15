import {
  CalendarExerciseDto,
  CourseSessionDto,
} from '@core/services/course-sessions-api.service';
import { CourseDto } from '@core/services/courses-api.service';
import { HolidayDto } from '@core/services/holidays-api.service';

export const MONTHS_LONG = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

export const MONTHS_SHORT = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
] as const;

export const WEEKDAYS_LONG = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo',
] as const;

export interface StudentClassOccurrence {
  readonly iso: string;
  readonly course: CourseDto;
  readonly session: CourseSessionDto | null;
}

export interface StudentCalendarCell {
  readonly iso: string;
  readonly day: number;
  readonly inMonth: boolean;
  readonly isToday: boolean;
  readonly isWeekend: boolean;
  readonly holidayName: string | null;
  readonly classes: readonly StudentClassOccurrence[];
  readonly dueTests: readonly CalendarExerciseDto[];
}

export function firstName(fullName: string): string {
  const part = fullName.trim().split(/\s+/).find(Boolean);
  return part ?? 'alumno';
}

export function parseIso(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) {
    return null;
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function toIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function todayIso(): string {
  return toIso(new Date());
}

export function isoWeekday(date: Date): number {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

export function formatShort(iso: string): string {
  const date = parseIso(iso);
  if (!date) {
    return iso;
  }

  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatNice(iso: string): string {
  const date = parseIso(iso);
  if (!date) {
    return iso;
  }

  const weekday = WEEKDAYS_LONG[isoWeekday(date) - 1];
  return `${weekday} ${date.getDate()} de ${MONTHS_LONG[date.getMonth()]}`;
}

export function formatMonthTitle(year: number, month: number): string {
  const label = MONTHS_LONG[month] ?? '';
  return `${label.charAt(0).toUpperCase()}${label.slice(1)} ${year}`;
}

export function holidayDates(holidays: readonly HolidayDto[]): ReadonlySet<string> {
  return new Set(
    holidays.filter((holiday) => holiday.is_active).map((holiday) => holiday.date.slice(0, 10)),
  );
}

export function sessionOnDate(
  sessions: Readonly<Record<string, readonly CourseSessionDto[]>>,
  courseUuid: string,
  iso: string,
): CourseSessionDto | null {
  return sessions[courseUuid]?.find((session) => session.session_on.slice(0, 10) === iso) ?? null;
}

export function isCourseClassDay(
  course: CourseDto,
  iso: string,
  holidays: ReadonlySet<string>,
): boolean {
  if (iso < course.start_date.slice(0, 10) || iso > course.end_date.slice(0, 10)) {
    return false;
  }

  if (holidays.has(iso)) {
    return false;
  }

  const date = parseIso(iso);
  if (!date) {
    return false;
  }

  const weekday = isoWeekday(date);
  const days = course.weekdays.length > 0 ? course.weekdays : [1, 2, 3, 4, 5];
  return days.includes(weekday);
}

export function occurrencesOn(
  iso: string,
  courses: readonly CourseDto[],
  sessions: Readonly<Record<string, readonly CourseSessionDto[]>>,
  holidays: ReadonlySet<string>,
): StudentClassOccurrence[] {
  return courses
    .filter((course) => isCourseClassDay(course, iso, holidays))
    .map((course) => ({
      iso,
      course,
      session: sessionOnDate(sessions, course.uuid, iso),
    }));
}

export function upcomingClasses(
  courses: readonly CourseDto[],
  sessions: Readonly<Record<string, readonly CourseSessionDto[]>>,
  holidays: readonly HolidayDto[],
  fromIso: string,
  limit: number,
  skipEndedToday = true,
): StudentClassOccurrence[] {
  const closed = holidayDates(holidays);
  const found: StudentClassOccurrence[] = [];
  const start = parseIso(fromIso);
  if (!start || limit <= 0) {
    return found;
  }

  for (let offset = 0; offset < 180 && found.length < limit; offset += 1) {
    const cursor = new Date(start);
    cursor.setDate(start.getDate() + offset);
    const iso = toIso(cursor);
    const dayClasses = occurrencesOn(iso, courses, sessions, closed);

    for (const item of dayClasses) {
      if (offset === 0 && skipEndedToday && classAlreadyEnded(item.course)) {
        continue;
      }

      found.push(item);
      if (found.length >= limit) {
        break;
      }
    }
  }

  return found;
}

export function pastClasses(
  courses: readonly CourseDto[],
  sessions: Readonly<Record<string, readonly CourseSessionDto[]>>,
  holidays: readonly HolidayDto[],
  beforeIso: string,
  limit: number,
): StudentClassOccurrence[] {
  const closed = holidayDates(holidays);
  const found: StudentClassOccurrence[] = [];
  const start = parseIso(beforeIso);
  if (!start || limit <= 0) {
    return found;
  }

  for (let offset = 1; offset < 180 && found.length < limit; offset += 1) {
    const cursor = new Date(start);
    cursor.setDate(start.getDate() - offset);
    const iso = toIso(cursor);
    const dayClasses = occurrencesOn(iso, courses, sessions, closed);
    found.push(...dayClasses);
  }

  return found.slice(0, limit);
}

export function exerciseOpenOn(_exercise: CalendarExerciseDto, _iso: string): boolean {
  return true;
}

export function testsDueOn(
  iso: string,
  exercises: Readonly<Record<string, readonly CalendarExerciseDto[]>>,
): CalendarExerciseDto[] {
  const due: CalendarExerciseDto[] = [];

  for (const items of Object.values(exercises)) {
    for (const exercise of items) {
      if (exercise.starts_on?.slice(0, 10) === iso) {
        due.push(exercise);
      }
    }
  }

  return due;
}

export function testsListedOn(
  iso: string,
  _courses: readonly CourseDto[],
  exercises: Readonly<Record<string, readonly CalendarExerciseDto[]>>,
  _holidays: ReadonlySet<string>,
): CalendarExerciseDto[] {
  return testsDueOn(iso, exercises);
}

export function buildMonthCells(
  year: number,
  month: number,
  courses: readonly CourseDto[],
  sessions: Readonly<Record<string, readonly CourseSessionDto[]>>,
  holidays: readonly HolidayDto[],
  today: string,
  exercises: Readonly<Record<string, readonly CalendarExerciseDto[]>> = {},
): StudentCalendarCell[][] {
  const closed = holidayDates(holidays);
  const holidayNames = new Map(
    holidays
      .filter((holiday) => holiday.is_active)
      .map((holiday) => [holiday.date.slice(0, 10), holiday.name] as const),
  );
  const gridStart = startOfWeek(new Date(year, month, 1));
  const gridEnd = endOfWeek(new Date(year, month + 1, 0));
  const weeks: StudentCalendarCell[][] = [];
  const cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    const week: StudentCalendarCell[] = [];
    for (let index = 0; index < 7; index += 1) {
      const iso = toIso(cursor);
      const weekend = isoWeekday(cursor) >= 6;
      week.push({
        iso,
        day: cursor.getDate(),
        inMonth: cursor.getMonth() === month,
        isToday: iso === today,
        isWeekend: weekend,
        holidayName: holidayNames.get(iso) ?? null,
        classes: occurrencesOn(iso, courses, sessions, closed),
        dueTests: testsDueOn(iso, exercises),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export function classAlreadyEnded(course: CourseDto, now = new Date()): boolean {
  const [hours, minutes] = course.schedule_end.split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return false;
  }

  const end = new Date(now);
  end.setHours(hours, minutes, 0, 0);
  return now.getTime() > end.getTime();
}

function startOfWeek(date: Date): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - (isoWeekday(copy) - 1));
  return copy;
}

function endOfWeek(date: Date): Date {
  const copy = startOfWeek(date);
  copy.setDate(copy.getDate() + 6);
  return copy;
}

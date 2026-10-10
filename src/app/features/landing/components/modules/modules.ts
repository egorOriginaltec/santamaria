import { Component, signal } from '@angular/core';
import {
  COURSE_MODULES,
  COURSE_OVERVIEW_EYEBROW,
  COURSE_OVERVIEW_HOURS,
  COURSE_OVERVIEW_INTRO,
  COURSE_OVERVIEW_TITLE,
  COURSE_OVERVIEW_WEEKS,
} from '@core/index';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.html',
  styleUrl: './modules.css',
})
export class Modules {
  readonly eyebrow = COURSE_OVERVIEW_EYEBROW;
  readonly title = COURSE_OVERVIEW_TITLE;
  readonly intro = COURSE_OVERVIEW_INTRO;
  readonly weeks = COURSE_OVERVIEW_WEEKS;
  readonly hours = COURSE_OVERVIEW_HOURS;
  readonly modules = COURSE_MODULES;

  readonly openModuleId = signal<number | null>(null);
  readonly openClassKey = signal<string | null>(null);

  isModuleOpen(id: number): boolean {
    return this.openModuleId() === id;
  }

  isClassOpen(moduleId: number, day: number): boolean {
    return this.openClassKey() === this.classKey(moduleId, day);
  }

  weeksLabel(weeks: string): string {
    return weeks.includes('–') ? `Semanas ${weeks}` : `Semana ${weeks}`;
  }

  projectsLabel(count: number): string {
    return `${count} proyecto${count === 1 ? '' : 's'}`;
  }

  toggleModule(id: number): void {
    this.openModuleId.update((current) => (current === id ? null : id));
    this.openClassKey.set(null);
  }

  toggleClass(moduleId: number, day: number): void {
    const key = this.classKey(moduleId, day);
    this.openClassKey.update((current) => (current === key ? null : key));
  }

  private classKey(moduleId: number, day: number): string {
    return `${moduleId}-${day}`;
  }
}

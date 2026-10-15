import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COURSE_PATHS, type CoursePath } from '../../data/course-paths';
import { LANDING_COURSES, type LandingCourse } from '../../data/courses';

@Component({
  selector: 'app-modules',
  imports: [RouterLink],
  templateUrl: './modules.html',
  styleUrl: './modules.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modules {
  readonly courses = LANDING_COURSES;
  readonly paths = COURSE_PATHS;
  readonly activePathId = signal<string | null>(null);

  readonly activePath = computed<CoursePath | null>(() => {
    const id = this.activePathId();
    return id ? (this.paths.find((path) => path.id === id) ?? null) : null;
  });

  readonly visibleCourses = computed<readonly LandingCourse[]>(() => {
    const path = this.activePath();
    if (!path) {
      return this.courses;
    }

    const order = new Map(path.slugs.map((slug, index) => [slug, index]));
    return this.courses
      .filter((course) => order.has(course.slug))
      .slice()
      .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
  });

  selectPath(id: string | null): void {
    this.activePathId.set(id);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { catchError, of, startWith } from 'rxjs';
import { COURSE_PATHS, type CoursePath } from '../../data/course-paths';
import { COURSES_GUIDE } from '../../data/courses-guide';
import { LANDING_COURSES, type LandingCourse } from '../../data/courses';

@Component({
  selector: 'app-modules',
  imports: [RouterLink],
  templateUrl: './modules.html',
  styleUrl: './modules.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modules {
  private readonly coursesApi = inject(CoursesApiService);

  private readonly apiCourses = toSignal(
    this.coursesApi.listPublic().pipe(
      catchError(() => of([] as readonly CourseDto[])),
      startWith(null as readonly CourseDto[] | null),
    ),
    { initialValue: null as readonly CourseDto[] | null },
  );

  readonly paths = COURSE_PATHS;
  readonly coursesGuide = COURSES_GUIDE;
  readonly activePathId = signal<string | null>(null);

  readonly courses = computed<readonly LandingCourse[]>(() => {
    const fromApi = this.apiCourses();
    if (fromApi && fromApi.length > 0) {
      return fromApi.map((course) => this.toLandingCourse(course));
    }

    return LANDING_COURSES;
  });

  readonly activePath = computed<CoursePath | null>(() => {
    const id = this.activePathId();
    return id ? (this.paths.find((path) => path.id === id) ?? null) : null;
  });

  readonly visibleCourses = computed<readonly LandingCourse[]>(() => {
    const path = this.activePath();
    if (!path) {
      return this.courses();
    }

    const order = new Map(path.slugs.map((slug, index) => [slug, index]));
    return this.courses()
      .filter((course) => order.has(course.slug))
      .slice()
      .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
  });

  selectPath(id: string | null): void {
    this.activePathId.set(id);
  }

  private toLandingCourse(course: CourseDto): LandingCourse {
    const fallback = LANDING_COURSES.find((item) => item.slug === course.slug);

    return {
      id: course.card_number || fallback?.id || '01',
      slug: course.slug || fallback?.slug || course.uuid,
      title: course.title,
      ages: course.age_range ?? '',
      schedule: course.landing_schedule || course.card_schedule_line || fallback?.schedule || '',
      price: course.price_label || `${course.price} €`,
      priceUnit: course.price_unit ?? 'mes',
      summary: course.card_summary || fallback?.summary || course.description,
      lead: fallback?.lead || course.description,
      tools: fallback?.tools || '',
      learns: fallback?.learns ?? [],
      icon: course.card_icon_url || fallback?.icon || '/assets/courses/puzzle.webp',
      cover: course.cover_color || fallback?.cover || '#f5f5f8',
      image: fallback?.image,
    };
  }
}

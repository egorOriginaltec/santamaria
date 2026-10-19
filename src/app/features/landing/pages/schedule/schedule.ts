import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AcademicCalendar } from '../../components/academic-calendar/academic-calendar';
import { COURSES_GUIDE } from '../../data/courses-guide';

@Component({
  selector: 'app-schedule',
  imports: [AcademicCalendar, RouterLink],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulePage {
  readonly coursesGuide = COURSES_GUIDE;
}

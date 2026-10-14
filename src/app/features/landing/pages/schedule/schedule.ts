import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AcademicCalendar } from '../../components/academic-calendar/academic-calendar';

@Component({
  selector: 'app-schedule',
  imports: [AcademicCalendar, RouterLink],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulePage {}

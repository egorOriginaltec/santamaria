import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LANDING_COURSES } from '../../data/courses';

@Component({
  selector: 'app-modules',
  imports: [RouterLink],
  templateUrl: './modules.html',
  styleUrl: './modules.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modules {
  readonly courses = LANDING_COURSES;
}

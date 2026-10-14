import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '@shared/directives/reveal.directive';
import { LANDING_COURSES } from '../../data/courses';

@Component({
  selector: 'app-modules',
  imports: [Reveal, RouterLink],
  templateUrl: './modules.html',
  styleUrl: './modules.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modules {
  readonly courses = LANDING_COURSES;
}

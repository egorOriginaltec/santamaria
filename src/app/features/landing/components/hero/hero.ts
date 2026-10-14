import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_FEATURES } from '@core/index';
import { Reveal } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [Reveal],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly features = HERO_FEATURES;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_FEATURES } from '@core/index';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly features = HERO_FEATURES;
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HERO_FEATURES } from '@core/index';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly features = HERO_FEATURES;
}

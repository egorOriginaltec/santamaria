import { Component } from '@angular/core';
import { Audience } from '../../components/audience/audience';
import { Hero } from '../../components/hero/hero';
import { Modules } from '../../components/modules/modules';
import { Pricing } from '../../components/pricing/pricing';

@Component({
  selector: 'app-landing',
  imports: [Hero, Modules, Audience, Pricing],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}

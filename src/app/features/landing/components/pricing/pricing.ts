import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PRICING_CTA_PATH,
  PRICING_INTRO,
  PRICING_PLANS,
  PRICING_TITLE,
} from '@core/index';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  readonly title = PRICING_TITLE;
  readonly intro = PRICING_INTRO;
  readonly plans = PRICING_PLANS;
  readonly ctaPath = PRICING_CTA_PATH;
}

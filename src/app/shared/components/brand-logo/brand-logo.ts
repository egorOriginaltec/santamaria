import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '@core/index';

export type BrandLogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.html',
  styleUrl: './brand-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'brand-logo',
    '[class.brand-logo--sm]': 'size() === "sm"',
    '[class.brand-logo--md]': 'size() === "md"',
    '[class.brand-logo--lg]': 'size() === "lg"',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class BrandLogo {
  /** Visual size token. */
  readonly size = input<BrandLogoSize>('md');

  /** Hide from AT when paired with visible brand text. */
  readonly decorative = input(true);

  readonly src = BRAND_LOGO_SRC;
  readonly alt = BRAND_LOGO_ALT;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  APP_EMAIL,
  APP_NAME,
  APP_TAGLINE,
  LEGAL_NAV,
  PRIMARY_NAV,
  SOCIAL_LINKS,
} from '@core/index';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly fullName = APP_NAME;
  readonly brandName = APP_NAME;
  readonly tagline = APP_TAGLINE;
  readonly email = APP_EMAIL;
  readonly year = new Date().getFullYear();
  readonly socialLinks = SOCIAL_LINKS;
  readonly legalLinks = LEGAL_NAV;

  readonly links: readonly { label: string; path: string; fragment?: string }[] = [
    ...PRIMARY_NAV.map((item) => ({
      label: item.label,
      path: item.path ?? '/',
      fragment: item.fragment,
    })),
    { label: 'Contacto', path: '/contacto' },
    { label: 'Acceso', path: '/acceso' },
  ];
}

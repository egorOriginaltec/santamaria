import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  APP_NAME,
  APP_TAGLINE,
  CONTACT_FORM_EMAIL,
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
  readonly tagline = APP_TAGLINE;
  readonly email = CONTACT_FORM_EMAIL;
  readonly year = new Date().getFullYear();
  readonly socialLinks = SOCIAL_LINKS;

  readonly links: readonly { label: string; path: string; fragment?: string }[] = [
    { label: 'Inicio', path: '/' },
    ...PRIMARY_NAV.map((item) => ({
      label: item.label,
      path: item.path ?? '/',
      fragment: item.fragment,
    })),
    { label: 'Contacto', path: '/contacto' },
    { label: 'Acceso', path: '/acceso' },
  ];
}

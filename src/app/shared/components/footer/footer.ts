import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_NAME, APP_WORD, PRIMARY_NAV } from '@core/index';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly brand = APP_WORD;
  readonly fullName = APP_NAME;
  readonly year = new Date().getFullYear();
  readonly links = PRIMARY_NAV.map((item) => ({
    label: item.label,
    path: item.path ?? '/',
  }));
}

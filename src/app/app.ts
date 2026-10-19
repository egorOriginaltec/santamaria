import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { AppToastHost } from '@shared/components/toast-host/toast-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppToastHost],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.init();
  }
}

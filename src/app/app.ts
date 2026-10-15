import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppToastHost } from '@shared/components/toast-host/toast-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppToastHost],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

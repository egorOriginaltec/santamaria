import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from '@shared/index';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}

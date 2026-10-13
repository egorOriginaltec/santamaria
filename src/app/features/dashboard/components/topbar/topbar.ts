import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOGIN_DEFAULT_EMAIL } from '@core/index';

@Component({
  selector: 'app-dashboard-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopbar {
  readonly title = input('Dashboard');
  readonly period = input('October 2026');
  readonly menuToggle = output<void>();

  readonly userName = 'Egor';
  readonly userEmail = LOGIN_DEFAULT_EMAIL;

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}

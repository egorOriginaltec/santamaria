import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../components/sidebar/sidebar';
import { DashboardTopbar } from '../components/topbar/topbar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, DashboardSidebar, DashboardTopbar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout {
  readonly menuOpen = signal(false);

  openMenu(): void {
    this.menuOpen.set(true);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

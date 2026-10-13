import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
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

  constructor() {
    effect((onCleanup) => {
      if (typeof window.matchMedia !== 'function') {
        return;
      }

      const lock = this.menuOpen();
      const query = window.matchMedia('(max-width: 1023px)');
      const sync = (): void => {
        document.body.style.overflow = lock && query.matches ? 'hidden' : '';
      };

      sync();
      query.addEventListener('change', sync);
      onCleanup(() => {
        query.removeEventListener('change', sync);
        document.body.style.overflow = '';
      });
    });
  }

  openMenu(): void {
    this.menuOpen.set(true);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

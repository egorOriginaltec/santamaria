import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopbar {
  private readonly router = inject(Router);

  readonly menuToggle = output<void>();
  readonly heading = signal('Panel');

  constructor() {
    const sync = (): void => {
      let route = this.router.routerState.snapshot.root;
      let page = '';

      while (route.firstChild) {
        route = route.firstChild;
        if (typeof route.title === 'string' && route.title.length > 0) {
          page = route.title.split('·')[0].trim();
        }
      }

      this.heading.set(page || 'Panel');
    };

    sync();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => sync());
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}

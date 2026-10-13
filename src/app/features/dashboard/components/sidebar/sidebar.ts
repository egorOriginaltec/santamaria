import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import { finalize } from 'rxjs';
import { DASHBOARD_NAV, STUDENT_NAV } from '../../constants';

function readSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem('santamaria-sidebar-collapsed') === '1';
  } catch {
    return false;
  }
}

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebar {
  private readonly auth = inject(AuthApiService);
  private readonly router = inject(Router);

  readonly groups = computed(() => {
    const roles = this.auth.user()?.roles ?? [];

    return roles.includes('student') && !roles.includes('administrator') ? STUDENT_NAV : DASHBOARD_NAV;
  });
  readonly homePath = computed(() => {
    const roles = this.auth.user()?.roles ?? [];

    return roles.includes('student') && !roles.includes('administrator') ? '/calendario' : '/dashboard';
  });
  readonly open = input(false);
  readonly closed = output<void>();
  readonly collapsed = signal(readSidebarCollapsed());
  readonly loggingOut = signal(false);

  readonly displayName = computed(() => this.auth.user()?.name ?? '');
  readonly displayEmail = computed(() => this.auth.user()?.email ?? '');
  readonly initials = computed(() => {
    const parts = this.displayName().trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
      return this.displayEmail().trim().slice(0, 2).toUpperCase();
    }

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  });

  close(): void {
    this.closed.emit();
  }

  toggleCollapsed(): void {
    this.collapsed.update((value) => !value);

    try {
      localStorage.setItem('santamaria-sidebar-collapsed', this.collapsed() ? '1' : '0');
    } catch {
      // The menu still collapses for this visit.
    }
  }

  logout(): void {
    if (this.loggingOut()) {
      return;
    }

    this.loggingOut.set(true);
    this.close();

    this.auth
      .logout()
      .pipe(finalize(() => this.loggingOut.set(false)))
      .subscribe({
        next: () => {
          void this.router.navigateByUrl('/login');
        },
        error: () => {
          void this.router.navigateByUrl('/login');
        },
      });
  }
}

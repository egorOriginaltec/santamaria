import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_NAME, APP_TAGLINE } from '@core/index';
import { DASHBOARD_NAV } from '../../constants';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebar {
  readonly brand = APP_NAME;
  readonly tagline = APP_TAGLINE;
  readonly groups = DASHBOARD_NAV;
  readonly open = input(false);
  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}

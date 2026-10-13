import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DASHBOARD_STATS } from '../../constants';

@Component({
  selector: 'app-dashboard-stats-cards',
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatsCards {
  readonly stats = DASHBOARD_STATS;
}

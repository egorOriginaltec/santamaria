import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface DashboardStatCard {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly hint: string;
  readonly delta: string | null;
  readonly trend: 'up' | 'down' | 'flat';
  readonly accent: string;
}

@Component({
  selector: 'app-dashboard-stats-cards',
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatsCards {
  readonly stats = input<readonly DashboardStatCard[]>([]);
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardEnrollmentBreakdown } from '../../components/enrollment-breakdown/enrollment-breakdown';
import { DashboardRecentStudents } from '../../components/recent-students/recent-students';
import { DashboardRevenueChart } from '../../components/revenue-chart/revenue-chart';
import { DashboardStatsCards } from '../../components/stats-cards/stats-cards';

@Component({
  selector: 'app-dashboard-home',
  imports: [
    DashboardStatsCards,
    DashboardRevenueChart,
    DashboardRecentStudents,
    DashboardEnrollmentBreakdown,
  ],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHome {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DASHBOARD_RECENT_STUDENTS } from '../../constants';

@Component({
  selector: 'app-dashboard-recent-students',
  templateUrl: './recent-students.html',
  styleUrl: './recent-students.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRecentStudents {
  readonly rows = DASHBOARD_RECENT_STUDENTS;

  statusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  }
}

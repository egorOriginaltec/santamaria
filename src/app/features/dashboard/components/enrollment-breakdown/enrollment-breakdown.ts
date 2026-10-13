import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DASHBOARD_ENROLLMENT_SLICES,
  DASHBOARD_ENROLLMENT_TOTAL,
} from '../../constants';

@Component({
  selector: 'app-dashboard-enrollment-breakdown',
  templateUrl: './enrollment-breakdown.html',
  styleUrl: './enrollment-breakdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEnrollmentBreakdown {
  readonly total = DASHBOARD_ENROLLMENT_TOTAL;
  readonly slices = DASHBOARD_ENROLLMENT_SLICES;

  get gradient(): string {
    let cursor = 0;
    const stops = this.slices.map((slice) => {
      const start = cursor;
      cursor += slice.value;
      return `${slice.color} ${start}% ${cursor}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }
}

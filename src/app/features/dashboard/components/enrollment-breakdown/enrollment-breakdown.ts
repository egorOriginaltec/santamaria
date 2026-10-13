import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface DashboardCourseShare {
  readonly title: string;
  readonly paid: number;
  readonly students: number;
  readonly color: string;
  readonly share: string;
}

@Component({
  selector: 'app-dashboard-enrollment-breakdown',
  templateUrl: './enrollment-breakdown.html',
  styleUrl: './enrollment-breakdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEnrollmentBreakdown {
  readonly total = input('0,00 €');
  readonly slices = input<readonly DashboardCourseShare[]>([]);

  get gradient(): string {
    const slices = this.slices();
    const sum = slices.reduce((total, slice) => total + slice.paid, 0);

    if (sum <= 0) {
      return 'conic-gradient(#efeff3 0% 100%)';
    }

    let cursor = 0;
    const stops = slices.map((slice) => {
      const start = cursor;
      cursor += (slice.paid / sum) * 100;
      return `${slice.color} ${start}% ${cursor}%`;
    });

    return `conic-gradient(${stops.join(', ')})`;
  }
}

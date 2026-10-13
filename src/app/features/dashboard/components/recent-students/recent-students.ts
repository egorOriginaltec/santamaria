import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface DashboardStudentRow {
  readonly uuid: string;
  readonly email: string;
  readonly courses: string;
  readonly joinedAt: string;
  readonly active: boolean;
  readonly paid: string;
}

@Component({
  selector: 'app-dashboard-recent-students',
  imports: [RouterLink],
  templateUrl: './recent-students.html',
  styleUrl: './recent-students.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRecentStudents {
  readonly rows = input<readonly DashboardStudentRow[]>([]);

  statusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }
}

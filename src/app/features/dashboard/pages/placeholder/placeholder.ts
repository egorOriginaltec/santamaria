import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-placeholder',
  imports: [RouterLink],
  templateUrl: './placeholder.html',
  styleUrl: './placeholder.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPlaceholder {
  readonly title = input.required<string>();
  readonly description = input(
    'This module is ready for the next iteration. Use the sidebar to keep navigating.',
  );
}

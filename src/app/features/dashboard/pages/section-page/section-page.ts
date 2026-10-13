import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DashboardPlaceholder } from '../placeholder/placeholder';

@Component({
  selector: 'app-dashboard-section-page',
  imports: [DashboardPlaceholder],
  template: `
    <app-dashboard-placeholder
      [title]="title()"
      [description]="description()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSectionPage {
  private readonly route = inject(ActivatedRoute);

  readonly title = toSignal(
    this.route.data.pipe(map((data) => String(data['title'] ?? 'Section'))),
    { initialValue: 'Section' },
  );

  readonly description = toSignal(
    this.route.data.pipe(
      map(
        (data) =>
          String(
            data['description'] ??
              'This module is ready for the next iteration. Use the sidebar to keep navigating.',
          ),
      ),
    ),
    {
      initialValue:
        'This module is ready for the next iteration. Use the sidebar to keep navigating.',
    },
  );
}

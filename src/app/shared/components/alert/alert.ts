import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
  styleUrl: './alert.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('alert', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)', marginBottom: '0' }),
        animate(
          '280ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'none', marginBottom: '0.85rem' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '180ms ease-in',
          style({ opacity: 0, transform: 'translateY(-6px)', marginBottom: '0' }),
        ),
      ]),
    ]),
  ],
  host: {
    '[@alert]': '',
    role: 'alert',
  },
})
export class AppAlert {
  readonly tone = input<'error' | 'ok'>('error');
}

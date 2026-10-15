import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-field-error',
  template: `<p class="field-error"><ng-content /></p>`,
  styles: `
    :host {
      display: block;
      margin-top: 0.4rem;
    }

    .field-error {
      margin: 0;
      color: #ef4444;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1.35;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fieldError', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-4px)' }),
        animate('220ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'none' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-3px)' })),
      ]),
    ]),
  ],
  host: {
    '[@fieldError]': '',
    role: 'alert',
  },
})
export class AppFieldError {}

import { animate, style, transition, trigger } from '@angular/animations';

/** Soft fade-up when student pages leave the loader. */
export const studentContentEnter = trigger('contentEnter', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(8px)' }),
    animate('450ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

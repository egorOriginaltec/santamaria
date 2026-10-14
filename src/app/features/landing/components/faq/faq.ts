import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Reveal } from '@shared/directives/reveal.directive';
import {
  FAQ_EYEBROW,
  FAQ_INTRO,
  FAQ_ITEMS,
  FAQ_TITLE,
} from '@core/index';

@Component({
  selector: 'app-faq',
  imports: [Reveal],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq {
  readonly eyebrow = FAQ_EYEBROW;
  readonly title = FAQ_TITLE;
  readonly intro = FAQ_INTRO;
  readonly items = FAQ_ITEMS;

  readonly openId = signal<number | null>(null);

  isOpen(id: number): boolean {
    return this.openId() === id;
  }

  toggle(id: number): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}

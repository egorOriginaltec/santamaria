import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OUTCOMES_EYEBROW,
  OUTCOMES_INTRO,
  OUTCOMES_ITEMS,
  OUTCOMES_TITLE,
} from '@core/index';

@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.html',
  styleUrl: './outcomes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Outcomes {
  readonly eyebrow = OUTCOMES_EYEBROW;
  readonly title = OUTCOMES_TITLE;
  readonly intro = OUTCOMES_INTRO;
  readonly items = OUTCOMES_ITEMS;

  isReversed(index: number): boolean {
    return index % 2 === 1;
  }
}

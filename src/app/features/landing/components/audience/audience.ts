import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AUDIENCE_EYEBROW,
  AUDIENCE_INTRO,
  AUDIENCE_REASONS,
  AUDIENCE_TITLE,
} from '@core/index';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.html',
  styleUrl: './audience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Audience {
  readonly eyebrow = AUDIENCE_EYEBROW;
  readonly title = AUDIENCE_TITLE;
  readonly intro = AUDIENCE_INTRO;
  readonly reasons = AUDIENCE_REASONS;
}

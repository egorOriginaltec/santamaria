import { ViewportScroller } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LANDING_FRAGMENT_ALIASES } from '@core/index';
import { AcademicCalendar } from '../../components/academic-calendar/academic-calendar';
import { Audience } from '../../components/audience/audience';
import { Faq } from '../../components/faq/faq';
import { Hero } from '../../components/hero/hero';
import { Modules } from '../../components/modules/modules';
import { ContactForm } from '@shared/components/contact-form/contact-form';

@Component({
  selector: 'app-landing',
  imports: [Hero, Modules, Audience, Faq, AcademicCalendar, ContactForm],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly route = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);

  constructor() {
    this.route.fragment.pipe(takeUntilDestroyed()).subscribe((fragment) => {
      this.scrollToFragment(fragment);
    });

    afterNextRender(() => {
      this.scrollToFragment(this.route.snapshot.fragment);
    });
  }

  private scrollToFragment(fragment: string | null): void {
    if (!fragment) {
      return;
    }

    const target = LANDING_FRAGMENT_ALIASES[fragment] ?? fragment;

    requestAnimationFrame(() => {
      this.viewport.scrollToAnchor(target);
    });
  }
}

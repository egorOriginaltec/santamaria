import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Audience } from '../../components/audience/audience';
import { Faq } from '../../components/faq/faq';
import { Hero } from '../../components/hero/hero';
import { Modules } from '../../components/modules/modules';
import { Pricing } from '../../components/pricing/pricing';
import { ContactForm } from '@shared/components/contact-form/contact-form';

@Component({
  selector: 'app-landing',
  imports: [Hero, Modules, Audience, Faq, Pricing, ContactForm],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}

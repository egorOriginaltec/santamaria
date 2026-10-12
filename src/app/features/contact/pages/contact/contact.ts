import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactForm } from '@shared/components/contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CONTACT_FORM_EMAIL,
  CONTACT_FORM_EYEBROW,
  CONTACT_FORM_INTRO,
  CONTACT_FORM_SUCCESS,
  CONTACT_FORM_TITLE,
} from '@core/index';

export type ContactFormTheme = 'dark' | 'light';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.theme-light]': 'theme() === "light"',
    '[class.theme-dark]': 'theme() === "dark"',
  },
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);

  readonly theme = input<ContactFormTheme>('dark');

  readonly eyebrow = CONTACT_FORM_EYEBROW;
  readonly title = CONTACT_FORM_TITLE;
  readonly intro = CONTACT_FORM_INTRO;
  readonly email = CONTACT_FORM_EMAIL;
  readonly successMessage = CONTACT_FORM_SUCCESS;

  readonly submitted = signal(false);
  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  fieldInvalid(controlName: 'name' | 'email' | 'phone' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    const { name, email, phone, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Consulta bootcamp — ${name}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Email: ${email}`,
        phone ? `Teléfono: ${phone}` : null,
        '',
        message,
      ]
        .filter((line): line is string => line !== null)
        .join('\n'),
    );

    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;

    this.submitted.set(true);
    this.submitting.set(false);
    this.form.reset();
  }
}

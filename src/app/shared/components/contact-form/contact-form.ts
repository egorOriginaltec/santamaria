import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  CONTACT_FORM_EMAIL,
  CONTACT_FORM_EYEBROW,
  CONTACT_FORM_INTRO,
  CONTACT_FORM_SUCCESS,
  CONTACT_FORM_TITLE,
} from '@core/index';
import { LeadsApiService } from '@core/services/leads-api.service';
import {
  normalizeEmail,
  normalizeMessage,
  normalizePersonName,
  stripUnsafeMessageChars,
  stripUnsafeNameChars,
} from '@core/utils/form-sanitize.utils';
import {
  formatPhoneDisplay,
  isValidEsOrLatamPhone,
  normalizePhoneForApi,
} from '@core/utils/phone.utils';
import { finalize } from 'rxjs';

export type ContactFormTheme = 'dark' | 'light';

function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value.trim()) {
    return null;
  }
  return isValidEsOrLatamPhone(value) ? null : { phone: true };
}

function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = normalizePersonName(String(control.value ?? ''));
  if (!value) {
    return { required: true };
  }
  if (value.length < 2) {
    return { minlength: { requiredLength: 2, actualLength: value.length } };
  }
  // Letters (incl. accents), spaces, hyphen, apostrophe
  if (!/^[\p{L}\s'’-]+$/u.test(value)) {
    return { name: true };
  }
  return null;
}

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
  private readonly leadsApi = inject(LeadsApiService);

  readonly theme = input<ContactFormTheme>('dark');
  readonly source = input('website');

  readonly eyebrow = CONTACT_FORM_EYEBROW;
  readonly title = CONTACT_FORM_TITLE;
  readonly intro = CONTACT_FORM_INTRO;
  readonly email = CONTACT_FORM_EMAIL;
  readonly successMessage = CONTACT_FORM_SUCCESS;

  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, nameValidator]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    phone: ['', [phoneValidator]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
  });

  fieldInvalid(controlName: 'name' | 'email' | 'phone' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = stripUnsafeNameChars(input.value).replace(/\s{2,}/g, ' ');
    if (cleaned !== input.value) {
      input.value = cleaned;
    }
    this.form.controls.name.setValue(cleaned, { emitEvent: false });
  }

  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\s+/g, '');
    if (cleaned !== input.value) {
      input.value = cleaned;
    }
    this.form.controls.email.setValue(cleaned, { emitEvent: false });
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = formatPhoneDisplay(input.value);
    input.value = formatted;
    this.form.controls.phone.setValue(formatted, { emitEvent: false });
    this.form.controls.phone.updateValueAndValidity({ emitEvent: false });
  }

  onPhoneKeydown(event: KeyboardEvent): void {
    // User never types spaces — formatting inserts them.
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
    }
  }

  onMessageInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const cleaned = stripUnsafeMessageChars(input.value);
    if (cleaned !== input.value) {
      const start = input.selectionStart;
      input.value = cleaned;
      input.setSelectionRange(start, start);
    }
    this.form.controls.message.setValue(cleaned, { emitEvent: false });
  }

  onSubmit(): void {
    this.form.patchValue({
      name: normalizePersonName(this.form.controls.name.value),
      email: normalizeEmail(this.form.controls.email.value),
      message: normalizeMessage(this.form.controls.message.value),
      phone: formatPhoneDisplay(this.form.controls.phone.value),
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const { name, email, phone, message } = this.form.getRawValue();
    const allowedSources = new Set(['landing', 'contact', 'website']);
    const source = allowedSources.has(this.source()) ? this.source() : 'website';

    this.leadsApi
      .create({
        name: normalizePersonName(stripUnsafeNameChars(name)),
        email: normalizeEmail(email),
        phone: normalizePhoneForApi(phone),
        message: normalizeMessage(stripUnsafeMessageChars(message)),
        source,
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.form.reset({ name: '', email: '', phone: '', message: '' });
        },
        error: (err: { status?: number; error?: { message?: string } }) => {
          if (err.status === 422) {
            this.errorMessage.set(
              'Revisa los datos del formulario. Algún campo no es válido.',
            );
            return;
          }
          this.errorMessage.set(
            'No se pudo enviar el mensaje. Comprueba que el API esté en marcha e inténtalo de nuevo.',
          );
        },
      });
  }
}

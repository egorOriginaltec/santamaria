import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { readApiError } from '@core/services/course-sessions-api.service';
import { LeadsApiService } from '@core/services/leads-api.service';
import { ToastService } from '@core/services/toast.service';
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
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppAlert } from '@shared/components/alert/alert';
import { AppFieldError } from '@shared/components/field-error/field-error';

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
  if (!/^[\p{L}\s'’-]+$/u.test(value)) {
    return { name: true };
  }
  return null;
}

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink, AppAlert, AppFieldError],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.theme-light]': 'theme() === "light"',
    '[class.theme-dark]': 'theme() === "dark"',
  },
})
export class ContactForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly leadsApi = inject(LeadsApiService);
  private readonly toast = inject(ToastService);
  private readonly document = inject(DOCUMENT);

  readonly theme = input<ContactFormTheme>('light');
  readonly source = input('website');

  readonly eyebrow = CONTACT_FORM_EYEBROW;
  readonly title = CONTACT_FORM_TITLE;
  readonly intro = CONTACT_FORM_INTRO;
  readonly email = CONTACT_FORM_EMAIL;
  readonly successMessage = CONTACT_FORM_SUCCESS;

  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly challengeLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly captchaQuestion = signal('');
  private captchaToken = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, nameValidator]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    phone: ['', [phoneValidator]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    accepted: [false, [Validators.requiredTrue]],
    captcha_answer: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
    /** Honeypot — humans never see/fill this. */
    website: [''],
  });

  ngOnInit(): void {
    this.loadChallenge();
  }

  resetForm(): void {
    this.submitted.set(false);
    this.errorMessage.set(null);
    this.form.reset({
      name: '',
      email: '',
      phone: '',
      message: '',
      accepted: false,
      captcha_answer: '',
      website: '',
    });
    this.loadChallenge();
  }

  fieldInvalid(
    controlName: 'name' | 'email' | 'phone' | 'message' | 'accepted' | 'captcha_answer',
  ): boolean {
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

  onCaptchaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\D+/g, '').slice(0, 2);
    if (cleaned !== input.value) {
      input.value = cleaned;
    }
    this.form.controls.captcha_answer.setValue(cleaned, { emitEvent: false });
  }

  onSubmit(): void {
    this.form.patchValue({
      name: normalizePersonName(this.form.controls.name.value),
      email: normalizeEmail(this.form.controls.email.value),
      message: normalizeMessage(this.form.controls.message.value),
      phone: formatPhoneDisplay(this.form.controls.phone.value),
    });

    if (this.form.invalid || !this.captchaToken) {
      this.form.markAllAsTouched();
      this.showError(
        this.captchaToken
          ? 'Revisa los campos marcados en rojo.'
          : 'Espera un segundo a que cargue la verificación.',
      );
      if (!this.captchaToken) {
        this.loadChallenge();
      }
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const { name, email, phone, message, captcha_answer, website } = this.form.getRawValue();
    const allowedSources = new Set(['landing', 'contact', 'website']);
    const source = allowedSources.has(this.source()) ? this.source() : 'website';
    const phoneForApi = normalizePhoneForApi(phone);

    this.leadsApi
      .create({
        name: normalizePersonName(stripUnsafeNameChars(name)),
        email: normalizeEmail(email),
        ...(phoneForApi ? { phone: phoneForApi } : {}),
        message: normalizeMessage(stripUnsafeMessageChars(message)),
        source,
        website: website.trim() || undefined,
        captcha_token: this.captchaToken,
        captcha_answer: Number(captcha_answer),
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.errorMessage.set(null);
          this.form.reset({
            name: '',
            email: '',
            phone: '',
            message: '',
            accepted: false,
            captcha_answer: '',
            website: '',
          });
          this.captchaToken = '';
          this.captchaQuestion.set('');
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 429) {
            this.showError('Has enviado demasiados mensajes. Espera un momento e inténtalo de nuevo.');
          } else {
            this.showError(
              readApiError(
                err,
                'No se pudo enviar el mensaje. Inténtalo de nuevo en un momento.',
              ),
            );
          }
          this.loadChallenge(true);
        },
      });
  }

  private loadChallenge(keepAnswer = false): void {
    this.challengeLoading.set(true);
    if (!keepAnswer) {
      this.form.controls.captcha_answer.setValue('');
    }

    this.leadsApi.challenge().subscribe({
      next: (challenge) => {
        this.captchaToken = challenge.token;
        this.captchaQuestion.set(challenge.question);
        this.challengeLoading.set(false);
      },
      error: () => {
        this.captchaToken = '';
        this.captchaQuestion.set('');
        this.challengeLoading.set(false);
        this.errorMessage.set(null);
        this.toast.error('No se pudo cargar la verificación. Recarga la página.');
      },
    });
  }

  private showError(message: string): void {
    this.errorMessage.set(message);
    queueMicrotask(() => {
      this.document
        .querySelector('#contact .app-alert, #contact app-alert')
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}

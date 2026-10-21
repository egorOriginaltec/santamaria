import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
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
  CAREERS_ATTACHMENT_ACCEPT,
  CAREERS_CV_ACCEPT,
  CAREERS_EMAIL,
  CAREERS_EYEBROW,
  CAREERS_HIGHLIGHTS,
  CAREERS_INTRO,
  CAREERS_MAX_ATTACHMENTS,
  CAREERS_MAX_FILE_BYTES,
  CAREERS_POSITIONS,
  CAREERS_SUCCESS,
  CAREERS_TITLE,
} from '@core/constants/careers/careers.constants';
import { readApiError } from '@core/services/course-sessions-api.service';
import { JobApplicationsApiService } from '@core/services/job-applications-api.service';
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

function optionalUrlValidator(control: AbstractControl): ValidationErrors | null {
  const raw = String(control.value ?? '').trim();
  if (!raw) {
    return null;
  }
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? null : { url: true };
  } catch {
    return { url: true };
  }
}

const CV_EXTENSIONS = new Set(['pdf', 'doc', 'docx']);
const ATTACHMENT_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp']);

@Component({
  selector: 'app-careers-form',
  imports: [ReactiveFormsModule, RouterLink, AppAlert, AppFieldError],
  templateUrl: './careers-form.html',
  styleUrl: './careers-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(JobApplicationsApiService);
  private readonly document = inject(DOCUMENT);

  readonly eyebrow = CAREERS_EYEBROW;
  readonly title = CAREERS_TITLE;
  readonly intro = CAREERS_INTRO;
  readonly email = CAREERS_EMAIL;
  readonly successMessage = CAREERS_SUCCESS;
  readonly highlights = CAREERS_HIGHLIGHTS;
  readonly positions = CAREERS_POSITIONS;
  readonly cvAccept = CAREERS_CV_ACCEPT;
  readonly attachmentAccept = CAREERS_ATTACHMENT_ACCEPT;

  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly challengeLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly captchaQuestion = signal('');
  readonly cvFile = signal<File | null>(null);
  readonly attachmentFiles = signal<File[]>([]);
  readonly cvError = signal<string | null>(null);
  readonly attachmentsError = signal<string | null>(null);
  private captchaToken = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, nameValidator]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    phone: ['', [phoneValidator]],
    position: ['', [Validators.required]],
    linkedin_url: ['', [optionalUrlValidator, Validators.maxLength(500)]],
    portfolio_url: ['', [optionalUrlValidator, Validators.maxLength(500)]],
    cover_letter: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(8000)]],
    accepted: [false, [Validators.requiredTrue]],
    captcha_answer: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
    website: [''],
  });

  ngOnInit(): void {
    this.loadChallenge();
  }

  resetForm(): void {
    this.submitted.set(false);
    this.errorMessage.set(null);
    this.cvError.set(null);
    this.attachmentsError.set(null);
    this.cvFile.set(null);
    this.attachmentFiles.set([]);
    this.form.reset({
      name: '',
      email: '',
      phone: '',
      position: '',
      linkedin_url: '',
      portfolio_url: '',
      cover_letter: '',
      accepted: false,
      captcha_answer: '',
      website: '',
    });
    this.loadChallenge();
  }

  fieldInvalid(
    controlName:
      | 'name'
      | 'email'
      | 'phone'
      | 'position'
      | 'linkedin_url'
      | 'portfolio_url'
      | 'cover_letter'
      | 'accepted'
      | 'captcha_answer',
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

  onCoverLetterInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const cleaned = stripUnsafeMessageChars(input.value);
    if (cleaned !== input.value) {
      const start = input.selectionStart;
      input.value = cleaned;
      input.setSelectionRange(start, start);
    }
    this.form.controls.cover_letter.setValue(cleaned, { emitEvent: false });
  }

  onCaptchaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\D+/g, '').slice(0, 2);
    if (cleaned !== input.value) {
      input.value = cleaned;
    }
    this.form.controls.captcha_answer.setValue(cleaned, { emitEvent: false });
  }

  onCvChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.cvError.set(null);

    if (!file) {
      this.cvFile.set(null);
      return;
    }

    const error = this.validateFile(file, CV_EXTENSIONS, 'CV');
    if (error) {
      this.cvFile.set(null);
      this.cvError.set(error);
      input.value = '';
      return;
    }

    this.cvFile.set(file);
  }

  onAttachmentsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.attachmentsError.set(null);

    if (files.length === 0) {
      this.attachmentFiles.set([]);
      return;
    }

    if (files.length > CAREERS_MAX_ATTACHMENTS) {
      this.attachmentsError.set(`Máximo ${CAREERS_MAX_ATTACHMENTS} archivos adicionales.`);
      this.attachmentFiles.set([]);
      input.value = '';
      return;
    }

    for (const file of files) {
      const error = this.validateFile(file, ATTACHMENT_EXTENSIONS, 'Adjunto');
      if (error) {
        this.attachmentsError.set(error);
        this.attachmentFiles.set([]);
        input.value = '';
        return;
      }
    }

    this.attachmentFiles.set(files);
  }

  clearCv(input: HTMLInputElement): void {
    this.cvFile.set(null);
    this.cvError.set(null);
    input.value = '';
  }

  clearAttachments(input: HTMLInputElement): void {
    this.attachmentFiles.set([]);
    this.attachmentsError.set(null);
    input.value = '';
  }

  fileLabel(file: File | null): string {
    if (!file) {
      return 'Ningún archivo seleccionado';
    }
    return `${file.name} · ${this.formatBytes(file.size)}`;
  }

  onSubmit(): void {
    this.form.patchValue({
      name: normalizePersonName(this.form.controls.name.value),
      email: normalizeEmail(this.form.controls.email.value),
      cover_letter: normalizeMessage(this.form.controls.cover_letter.value),
      phone: formatPhoneDisplay(this.form.controls.phone.value),
      linkedin_url: this.form.controls.linkedin_url.value.trim(),
      portfolio_url: this.form.controls.portfolio_url.value.trim(),
    });

    const cv = this.cvFile();
    if (!cv) {
      this.cvError.set('Adjunta tu CV en PDF o Word.');
    }

    if (this.form.invalid || !cv || !this.captchaToken) {
      this.form.markAllAsTouched();
      this.showError(
        this.captchaToken
          ? 'Revisa los campos marcados y adjunta tu CV.'
          : 'Espera un segundo a que cargue la verificación.',
      );
      if (!this.captchaToken) {
        this.loadChallenge();
      }
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    const phoneForApi = normalizePhoneForApi(raw.phone);

    this.api
      .create({
        name: normalizePersonName(stripUnsafeNameChars(raw.name)),
        email: normalizeEmail(raw.email),
        ...(phoneForApi ? { phone: phoneForApi } : {}),
        position: raw.position || undefined,
        linkedin_url: raw.linkedin_url || undefined,
        portfolio_url: raw.portfolio_url || undefined,
        cover_letter: normalizeMessage(stripUnsafeMessageChars(raw.cover_letter)),
        cv,
        attachments: this.attachmentFiles(),
        website: raw.website.trim() || undefined,
        captcha_token: this.captchaToken,
        captcha_answer: Number(raw.captcha_answer),
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.errorMessage.set(null);
          this.cvFile.set(null);
          this.attachmentFiles.set([]);
          this.form.reset({
            name: '',
            email: '',
            phone: '',
            position: '',
            linkedin_url: '',
            portfolio_url: '',
            cover_letter: '',
            accepted: false,
            captcha_answer: '',
            website: '',
          });
          this.captchaToken = '';
          this.captchaQuestion.set('');
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 429) {
            this.showError(
              'Has enviado demasiadas solicitudes. Espera un momento e inténtalo de nuevo.',
            );
          } else {
            this.showError(
              readApiError(
                err,
                'No se pudo enviar la candidatura. Inténtalo de nuevo en un momento.',
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

    this.api.challenge().subscribe({
      next: (challenge) => {
        this.captchaToken = challenge.token;
        this.captchaQuestion.set(challenge.question);
        this.challengeLoading.set(false);
      },
      error: () => {
        this.captchaToken = '';
        this.captchaQuestion.set('');
        this.challengeLoading.set(false);
        this.showError('No se pudo cargar la verificación. Recarga la página.');
      },
    });
  }

  private validateFile(
    file: File,
    allowedExtensions: Set<string>,
    label: string,
  ): string | null {
    if (file.size <= 0) {
      return `${label}: el archivo está vacío.`;
    }
    if (file.size > CAREERS_MAX_FILE_BYTES) {
      return `${label}: máximo 5 MB.`;
    }

    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!allowedExtensions.has(extension)) {
      return `${label}: formato no permitido.`;
    }

    return null;
  }

  private formatBytes(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private showError(message: string): void {
    this.errorMessage.set(message);
    queueMicrotask(() => {
      this.document
        .querySelector('#careers .app-alert, #careers app-alert')
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}

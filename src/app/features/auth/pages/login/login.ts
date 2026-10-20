import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppFieldError } from '@shared/components/field-error/field-error';
import {
  LOGIN_ADMIN_EMAIL,
  LOGIN_ADMIN_PASSWORD,
  LOGIN_EYEBROW,
  LOGIN_HELP,
  LOGIN_HELP_PATH,
  LOGIN_INTRO,
  LOGIN_TITLE,
} from '@core/index';
import { AuthApiService } from '@core/services/auth-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import { finalize } from 'rxjs';

const TITLE_TAP_WINDOW_MS = 650;
const TITLE_TAP_TARGET = 3;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AppFieldError],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApiService);
  private readonly toast = inject(ToastService);

  readonly eyebrow = LOGIN_EYEBROW;
  readonly title = LOGIN_TITLE;
  readonly intro = LOGIN_INTRO;
  readonly help = LOGIN_HELP;
  readonly helpPath = LOGIN_HELP_PATH;

  readonly showPassword = signal(false);
  readonly submitting = signal(false);

  private titleTapCount = 0;
  private titleTapTimer: ReturnType<typeof setTimeout> | null = null;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  onTitleActivate(event: Event): void {
    event.preventDefault();

    if (this.titleTapTimer) {
      clearTimeout(this.titleTapTimer);
      this.titleTapTimer = null;
    }

    this.titleTapCount += 1;

    if (this.titleTapCount >= TITLE_TAP_TARGET) {
      this.titleTapCount = 0;
      this.fillAdminCredentials();
      return;
    }

    this.titleTapTimer = setTimeout(() => {
      this.titleTapCount = 0;
      this.titleTapTimer = null;
    }, TITLE_TAP_WINDOW_MS);
  }

  fieldInvalid(controlName: 'email' | 'password'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  emailError(): string {
    const control = this.form.controls.email;
    if (control.hasError('required')) {
      return 'El email es obligatorio.';
    }
    if (control.hasError('email')) {
      return 'Indica un email válido.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica un email válido.';
  }

  passwordError(): string {
    const control = this.form.controls.password;
    if (control.hasError('required')) {
      return 'La contraseña es obligatoria.';
    }
    if (control.hasError('minlength')) {
      return 'Mínimo 6 caracteres.';
    }
    if (control.hasError('server')) {
      return String(control.getError('server'));
    }
    return 'Indica una contraseña válida.';
  }

  onEmailInput(): void {
    this.clearServerError('email');
  }

  onPasswordInput(): void {
    this.clearServerError('password');
  }

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Revisa el email y la contraseña.');
      return;
    }

    this.submitting.set(true);
    this.clearServerError('email');
    this.clearServerError('password');

    const { email, password, remember } = this.form.getRawValue();

    this.authApi
      .login(email.trim().toLowerCase(), password, remember)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (user) => {
          const roles = user.roles ?? [];
          const destination = roles.includes('administrator')
            ? '/dashboard'
            : roles.includes('student')
              ? '/alumno'
              : '/acceso';

          this.toast.success('Sesión iniciada correctamente.');
          void this.router.navigateByUrl(destination);
        },
        error: (err: HttpErrorResponse) => {
          this.applyServerFieldErrors(err);
          this.toast.error(this.loginErrorMessage(err));
        },
      });
  }

  private fillAdminCredentials(): void {
    this.form.patchValue({
      email: LOGIN_ADMIN_EMAIL,
      password: LOGIN_ADMIN_PASSWORD,
      remember: true,
    });
    this.clearServerError('email');
    this.clearServerError('password');
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private loginErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 429) {
      return readApiError(err, 'Demasiados intentos. Espera un momento.');
    }

    if (err.status === 401 || err.status === 422) {
      const message = readApiError(err, 'Email o contraseña incorrectos.');
      if (
        /sesión ha caducado|entra otra vez|unauthenticated|unauthorized/i.test(
          message,
        )
      ) {
        return 'Email o contraseña incorrectos.';
      }
      return message;
    }

    return readApiError(
      err,
      'No se pudo iniciar sesión. Inténtalo de nuevo en un momento.',
    );
  }

  private applyServerFieldErrors(err: HttpErrorResponse): void {
    const errors = err.error?.errors;
    if (!errors || typeof errors !== 'object') {
      return;
    }

    const bag = errors as Record<string, unknown>;

    for (const field of ['email', 'password'] as const) {
      const value = bag[field];
      const list = Array.isArray(value) ? value : value != null ? [value] : [];
      const first = list.find(
        (item): item is string => typeof item === 'string' && item.length > 0,
      );

      if (!first) {
        continue;
      }

      const message = readApiError(
        new HttpErrorResponse({
          error: { message: first },
          status: err.status,
          statusText: err.statusText,
        }),
        field === 'email'
          ? 'Indica un email válido.'
          : 'Indica una contraseña válida.',
      );

      this.form.controls[field].setErrors({ server: message });
      this.form.controls[field].markAsTouched();
    }
  }

  private clearServerError(controlName: 'email' | 'password'): void {
    const control = this.form.controls[controlName];
    if (!control.hasError('server')) {
      return;
    }

    control.updateValueAndValidity({ emitEvent: false });
  }
}

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
import {
  LOGIN_DEFAULT_EMAIL,
  LOGIN_DEFAULT_PASSWORD,
  LOGIN_EYEBROW,
  LOGIN_HELP,
  LOGIN_HELP_PATH,
  LOGIN_INTRO,
  LOGIN_TITLE,
} from '@core/index';
import { AuthApiService } from '@core/services/auth-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApiService);

  readonly eyebrow = LOGIN_EYEBROW;
  readonly title = LOGIN_TITLE;
  readonly intro = LOGIN_INTRO;
  readonly help = LOGIN_HELP;
  readonly helpPath = LOGIN_HELP_PATH;

  readonly showPassword = signal(false);
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: [LOGIN_DEFAULT_EMAIL, [Validators.required, Validators.email]],
    password: [
      LOGIN_DEFAULT_PASSWORD,
      [Validators.required, Validators.minLength(6)],
    ],
    remember: [true],
  });

  fieldInvalid(controlName: 'email' | 'password'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

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
              ? '/calendario'
              : '/login';

          void this.router.navigateByUrl(destination);
        },
        error: (err: { status?: number; error?: { message?: string } }) => {
          if (err.status === 422) {
            this.errorMessage.set('Email o contraseña incorrectos.');
            return;
          }
          this.errorMessage.set(
            'No se pudo iniciar sesión. Comprueba que el API esté en marcha.',
          );
        },
      });
  }

  resetForm(): void {
    this.submitted.set(false);
    this.errorMessage.set(null);
    this.form.reset({
      email: LOGIN_DEFAULT_EMAIL,
      password: LOGIN_DEFAULT_PASSWORD,
      remember: true,
    });
  }
}

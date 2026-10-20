import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_NAME, APP_TAGLINE } from '@core/constants/app/app.constants';
import { AuthApiService } from '@core/services/auth-api.service';
import { BrandLogo } from '@shared/components/brand-logo/brand-logo';
import { finalize } from 'rxjs';
import { StudentCampusService } from '../data/student-campus.service';
import { firstName } from '../student-schedule';

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BrandLogo],
  templateUrl: './student-layout.html',
  styleUrl: './student-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentLayout {
  private readonly auth = inject(AuthApiService);
  private readonly campus = inject(StudentCampusService);
  private readonly router = inject(Router);

  readonly brandName = APP_NAME;
  readonly brandTag = APP_TAGLINE;
  readonly menuOpen = signal(false);
  readonly loggingOut = signal(false);
  readonly firstName = computed(() => firstName(this.auth.user()?.name ?? this.auth.user()?.email ?? ''));

  constructor() {
    this.campus.ensure();
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  logout(): void {
    if (this.loggingOut()) {
      return;
    }

    this.loggingOut.set(true);
    this.closeMenu();
    this.campus.clear();
    this.auth
      .logout()
      .pipe(finalize(() => this.loggingOut.set(false)))
      .subscribe({
        next: () => void this.router.navigateByUrl('/acceso'),
        error: () => void this.router.navigateByUrl('/acceso'),
      });
  }
}

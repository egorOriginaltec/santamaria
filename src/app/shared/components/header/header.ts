import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  APP_TAGLINE,
  COURSE_START_MS,
  PRIMARY_NAV,
  SOCIAL_LINKS,
  type CountdownParts,
} from '@core/index';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly tagline = APP_TAGLINE;
  readonly navItems = PRIMARY_NAV;
  readonly socialLinks = SOCIAL_LINKS;

  readonly countdown = signal<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  menuOpen = false;

  ngOnInit(): void {
    interval(1000)
      .pipe(
        startWith(0),
        map(() => this.computeCountdown()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((parts) => this.countdown.set(parts));
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private computeCountdown(): CountdownParts {
    const diff = COURSE_START_MS - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
    }

    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    return { days, hours, minutes, seconds, finished: false };
  }
}

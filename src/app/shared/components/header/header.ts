import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  APP_EMAIL,
  APP_NAME,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly brandName = APP_NAME;
  readonly tagline = APP_TAGLINE;
  readonly email = APP_EMAIL;
  readonly navItems = PRIMARY_NAV;
  readonly socialLinks = SOCIAL_LINKS;

  readonly countdown = signal<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  readonly menuOpen = signal(false);

  constructor() {
    effect(() => {
      const open = this.menuOpen();
      document.body.style.overflow = open ? 'hidden' : '';
    });

    afterNextRender(() => {
      this.syncHeaderHeight();
      const observer = new ResizeObserver(() => this.syncHeaderHeight());
      observer.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });

    this.destroyRef.onDestroy(() => {
      document.body.style.overflow = '';
    });
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(
        startWith(0),
        map(() => this.computeCountdown()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((parts) => this.countdown.set(parts));
  }

  private syncHeaderHeight(): void {
    const height = this.host.nativeElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      '--site-header-height',
      `${Math.ceil(height)}px`,
    );
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
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

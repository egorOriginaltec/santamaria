import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AosService } from '@core/services/aos.service';
import { Footer, Header } from '@shared/index';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly aos = inject(AosService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageShell = viewChild.required<ElementRef<HTMLElement>>('pageShell');

  constructor() {
    this.aos.start();

    afterNextRender(() => this.playPageEnter());

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.playPageEnter();
        this.aos.replay();
      });
  }

  private playPageEnter(): void {
    const el = this.pageShell().nativeElement;
    el.classList.remove('page-shell--play');
    // Force reflow so the animation always restarts on route change.
    void el.offsetWidth;
    el.classList.add('page-shell--play');
  }
}

import { afterNextRender, DestroyRef, inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import AOS from 'aos';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AosService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private ready = false;
  private timers: number[] = [];

  start(): void {
    afterNextRender(() => {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        offset: 24,
        delay: 0,
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
        startEvent: 'DOMContentLoaded',
        disableMutationObserver: false,
        debounceDelay: 20,
        throttleDelay: 40,
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
      this.ready = true;
      this.replay();

      const sub = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.replay());

      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
        this.clearTimers();
      });
    });
  }

  /** Obligatorio: en cada cambio de página reinicia y muestra lo visible con fade suave. */
  replay(): void {
    if (!this.ready) {
      return;
    }

    this.clearTimers();

    // Varios ticks: Angular tarda un poco en pintar el nuevo DOM.
    this.timers.push(
      window.setTimeout(() => this.runReplay(), 0),
      window.setTimeout(() => this.runReplay(), 80),
      window.setTimeout(() => this.runReplay(), 220),
    );
  }

  private runReplay(): void {
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-aos]')];
    if (nodes.length === 0) {
      return;
    }

    nodes.forEach((el) => {
      el.classList.remove('aos-animate');
    });

    AOS.refreshHard();

    // Forzar paint en estado oculto y luego animar lo que está en viewport.
    this.timers.push(
      window.setTimeout(() => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        document.querySelectorAll<HTMLElement>('[data-aos]').forEach((el) => {
          el.classList.add('aos-init');
          const rect = el.getBoundingClientRect();
          if (rect.top < vh + 80 && rect.bottom > -40) {
            el.classList.add('aos-animate');
          }
        });
        AOS.refresh();
        window.dispatchEvent(new Event('scroll'));
      }, 30),
    );
  }

  private clearTimers(): void {
    this.timers.forEach((id) => window.clearTimeout(id));
    this.timers = [];
  }
}

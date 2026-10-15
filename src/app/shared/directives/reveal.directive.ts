import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal-stagger]': 'stagger()',
    '[class.is-in]': 'shown()',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class Reveal {
  readonly delay = input(0);
  readonly stagger = input(false);
  readonly shown = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.host.nativeElement;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.shown.set(true);
        return;
      }

      let done = false;
      let timer = 0;

      const reveal = (immediate = false) => {
        if (done) {
          return;
        }
        done = true;

        const run = () => this.shown.set(true);

        if (immediate) {
          // Above-the-fold: force a painted opacity:0 frame before is-in.
          timer = window.setTimeout(run, 40);
          this.destroyRef.onDestroy(() => window.clearTimeout(timer));
          return;
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(run);
        });
      };

      const inView = () => {
        const rect = node.getBoundingClientRect();
        const height = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < height * 0.92 && rect.bottom > height * 0.04;
      };

      if (typeof IntersectionObserver === 'undefined') {
        const onScroll = () => {
          if (inView()) {
            window.removeEventListener('scroll', onScroll);
            reveal(true);
          }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
        if (inView()) {
          reveal(true);
        }
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            reveal(true);
          }
        },
        { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
      );

      observer.observe(node);
      this.destroyRef.onDestroy(() => observer.disconnect());

      if (inView()) {
        reveal(true);
      }
    });
  }
}

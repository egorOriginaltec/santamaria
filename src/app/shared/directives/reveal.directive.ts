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

      const inView = () => {
        const rect = node.getBoundingClientRect();
        const height = window.innerHeight;
        return rect.top < height * 0.88 && rect.bottom > height * 0.06;
      };

      const show = () => {
        if (!inView()) {
          return;
        }
        this.shown.set(true);
        window.removeEventListener('scroll', show);
      };

      window.addEventListener('scroll', show, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', show));
      show();
    });
  }
}

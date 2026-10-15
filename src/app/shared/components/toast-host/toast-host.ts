import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
} from '@angular/core';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.html',
  styleUrl: './toast-host.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toast', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(18px) scale(0.98)' }),
        animate(
          '320ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'none' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '220ms ease-in',
          style({ opacity: 0, transform: 'translateY(12px) scale(0.98)' }),
        ),
      ]),
    ]),
  ],
})
export class AppToastHost implements OnDestroy {
  private readonly toastService = inject(ToastService);
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  readonly toasts = this.toastService.toasts;

  constructor() {
    effect(() => {
      const list = this.toasts();
      const alive = new Set(list.map((toast) => toast.id));

      for (const id of this.timers.keys()) {
        if (!alive.has(id)) {
          clearTimeout(this.timers.get(id));
          this.timers.delete(id);
        }
      }

      for (const toast of list) {
        if (this.timers.has(toast.id)) {
          continue;
        }

        this.timers.set(
          toast.id,
          setTimeout(() => this.dismiss(toast.id), toast.durationMs),
        );
      }
    });
  }

  ngOnDestroy(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toastService.dismiss(id);
  }
}

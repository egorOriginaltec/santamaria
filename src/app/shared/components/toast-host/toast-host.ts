import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
  untracked,
} from '@angular/core';
import { ToastItem, ToastService } from '@core/services/toast.service';

interface ToastView extends ToastItem {
  readonly phase: 'enter' | 'shown' | 'leave';
}

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.html',
  styleUrl: './toast-host.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToastHost implements OnDestroy {
  private readonly toastService = inject(ToastService);
  private readonly dismissTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly enterTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly leaveTimers = new Map<number, ReturnType<typeof setTimeout>>();

  /** Local view-model so leave CSS can finish before removal. */
  readonly views = signal<readonly ToastView[]>([]);

  constructor() {
    effect(() => {
      const source = this.toastService.toasts();
      const current = untracked(() => this.views());
      const sourceIds = new Set(source.map((toast) => toast.id));
      const currentIds = new Set(current.map((toast) => toast.id));

      let next = current.filter(
        (view) => sourceIds.has(view.id) || view.phase === 'leave',
      );

      for (const toast of source) {
        if (currentIds.has(toast.id)) {
          continue;
        }

        next = [...next, { ...toast, phase: 'enter' }];
        this.scheduleEnter(toast.id);
        this.scheduleAutoDismiss(toast);
      }

      next = next.map((view) => {
        if (!sourceIds.has(view.id) && view.phase !== 'leave') {
          this.clearAutoDismiss(view.id);
          this.scheduleLeaveCleanup(view.id);
          return { ...view, phase: 'leave' as const };
        }
        return view;
      });

      const changed =
        next.length !== current.length ||
        next.some(
          (view, index) =>
            view.id !== current[index]?.id || view.phase !== current[index]?.phase,
        );

      if (changed) {
        this.views.set(next);
      }
    });
  }

  ngOnDestroy(): void {
    for (const timer of this.dismissTimers.values()) clearTimeout(timer);
    for (const timer of this.enterTimers.values()) clearTimeout(timer);
    for (const timer of this.leaveTimers.values()) clearTimeout(timer);
    this.dismissTimers.clear();
    this.enterTimers.clear();
    this.leaveTimers.clear();
  }

  dismiss(id: number): void {
    this.beginLeave(id);
    this.toastService.dismiss(id);
  }

  private scheduleEnter(id: number): void {
    // Next frame → flip to "shown" so CSS transition runs.
    const timer = setTimeout(() => {
      this.enterTimers.delete(id);
      this.views.update((list) =>
        list.map((view) =>
          view.id === id && view.phase === 'enter'
            ? { ...view, phase: 'shown' }
            : view,
        ),
      );
    }, 16);
    this.enterTimers.set(id, timer);
  }

  private scheduleAutoDismiss(toast: ToastItem): void {
    if (this.dismissTimers.has(toast.id)) {
      return;
    }

    this.dismissTimers.set(
      toast.id,
      setTimeout(() => this.dismiss(toast.id), toast.durationMs),
    );
  }

  private clearAutoDismiss(id: number): void {
    const timer = this.dismissTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.dismissTimers.delete(id);
    }
  }

  private beginLeave(id: number): void {
    this.clearAutoDismiss(id);
    this.views.update((list) =>
      list.map((view) =>
        view.id === id && view.phase !== 'leave'
          ? { ...view, phase: 'leave' }
          : view,
      ),
    );
    this.scheduleLeaveCleanup(id);
  }

  private scheduleLeaveCleanup(id: number): void {
    if (this.leaveTimers.has(id)) {
      return;
    }

    this.leaveTimers.set(
      id,
      setTimeout(() => {
        this.leaveTimers.delete(id);
        this.views.update((list) => list.filter((view) => view.id !== id));
      }, 320),
    );
  }
}

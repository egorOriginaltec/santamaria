import { Injectable, signal } from '@angular/core';

export type ToastTone = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  readonly id: number;
  readonly tone: ToastTone;
  readonly title: string;
  readonly message: string;
  readonly durationMs: number;
  readonly createdAt: number;
}

const DEFAULT_TITLES: Readonly<Record<ToastTone, string>> = {
  success: '¡Hecho!',
  error: '¡Error!',
  info: 'Info',
  warning: 'Atención',
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  private lastKey = '';
  private lastAt = 0;

  readonly toasts = signal<readonly ToastItem[]>([]);

  success(message: string, title = DEFAULT_TITLES.success, durationMs = 4200): void {
    this.push('success', title, message, durationMs);
  }

  error(message: string, title = DEFAULT_TITLES.error, durationMs = 5200): void {
    this.push('error', title, message, durationMs);
  }

  info(message: string, title = DEFAULT_TITLES.info, durationMs = 4200): void {
    this.push('info', title, message, durationMs);
  }

  warning(message: string, title = DEFAULT_TITLES.warning, durationMs = 4800): void {
    this.push('warning', title, message, durationMs);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }

  private push(tone: ToastTone, title: string, message: string, durationMs: number): void {
    const text = message.trim();
    if (text === '') {
      return;
    }

    const key = `${tone}:${title}:${text}`;
    const now = Date.now();
    if (key === this.lastKey && now - this.lastAt < 1600) {
      return;
    }

    this.lastKey = key;
    this.lastAt = now;

    const item: ToastItem = {
      id: this.nextId++,
      tone,
      title,
      message: text,
      durationMs,
      createdAt: now,
    };

    this.toasts.update((list) => [...list, item].slice(-4));
  }
}

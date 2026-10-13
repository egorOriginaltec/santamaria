import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { DashboardSeriesPoint } from '@core/services/dashboard-api.service';

type ChartMode = 'billing' | 'students';

@Component({
  selector: 'app-dashboard-revenue-chart',
  templateUrl: './revenue-chart.html',
  styleUrl: './revenue-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRevenueChart {
  readonly points = input<readonly DashboardSeriesPoint[]>([]);
  readonly currentLabel = input('Este periodo');
  readonly previousLabel = input('Periodo anterior');

  readonly mode = signal<ChartMode>('billing');

  readonly width = 640;
  readonly height = 220;
  readonly padX = 24;
  readonly padY = 20;

  setMode(mode: ChartMode): void {
    this.mode.set(mode);
  }

  get currentPath(): string {
    return this.buildPath(this.series('current'));
  }

  get previousPath(): string {
    return this.buildPath(this.series('previous'));
  }

  get currentArea(): string {
    const values = this.series('current');
    if (values.length === 0) {
      return '';
    }

    const line = this.buildPath(values);
    const last = this.project(values.length - 1, values[values.length - 1]);
    const first = this.project(0, values[0]);
    return `${line} L ${last.x} ${this.height - this.padY} L ${first.x} ${this.height - this.padY} Z`;
  }

  get highlight(): { x: number; y: number; value: string } | null {
    const values = this.series('current');
    if (values.length === 0) {
      return null;
    }

    let index = values.length - 1;
    for (let cursor = values.length - 1; cursor >= 0; cursor -= 1) {
      if (values[cursor] > 0) {
        index = cursor;
        break;
      }
    }

    const point = this.project(index, values[index]);
    return {
      x: point.x,
      y: point.y,
      value: this.formatValue(values[index]),
    };
  }

  lineX(index: number): number {
    const last = Math.max(this.points().length - 1, 1);
    return this.padX + (index / last) * (this.width - this.padX * 2);
  }

  private series(which: 'current' | 'previous'): number[] {
    const students = this.mode() === 'students';

    return this.points().map((point) => {
      if (which === 'current') {
        return students ? point.students : point.paid;
      }

      return students ? point.previous_students : point.previous_paid;
    });
  }

  private buildPath(values: number[]): string {
    return values
      .map((value, index) => {
        const point = this.project(index, value);
        return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
      })
      .join(' ');
  }

  private project(index: number, value: number): { x: number; y: number } {
    const max = Math.max(...this.series('current'), ...this.series('previous'), 1);
    const spanY = this.height - this.padY * 2;
    const y = this.height - this.padY - (value / max) * spanY;
    return { x: this.lineX(index), y };
  }

  private formatValue(value: number): string {
    if (this.mode() === 'students') {
      return new Intl.NumberFormat('es-ES').format(value);
    }

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
}

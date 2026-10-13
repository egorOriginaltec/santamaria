import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DASHBOARD_REVENUE_HINT,
  DASHBOARD_REVENUE_POINTS,
  DASHBOARD_REVENUE_TITLE,
} from '../../constants';

@Component({
  selector: 'app-dashboard-revenue-chart',
  templateUrl: './revenue-chart.html',
  styleUrl: './revenue-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRevenueChart {
  readonly title = DASHBOARD_REVENUE_TITLE;
  readonly hint = DASHBOARD_REVENUE_HINT;
  readonly points = DASHBOARD_REVENUE_POINTS;

  readonly width = 640;
  readonly height = 220;
  readonly padX = 24;
  readonly padY = 20;

  get currentPath(): string {
    return this.buildPath(this.points.map((point) => point.current));
  }

  get previousPath(): string {
    return this.buildPath(this.points.map((point) => point.previous));
  }

  get currentArea(): string {
    const line = this.buildPath(this.points.map((point) => point.current));
    const last = this.project(this.points.length - 1, this.points[this.points.length - 1].current);
    const first = this.project(0, this.points[0].current);
    return `${line} L ${last.x} ${this.height - this.padY} L ${first.x} ${this.height - this.padY} Z`;
  }

  get highlight(): { x: number; y: number; value: string } {
    const index = 3;
    const point = this.project(index, this.points[index].current);
    return {
      x: point.x,
      y: point.y,
      value: `€${(this.points[index].current * 850).toLocaleString('en-US')}`,
    };
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
    const max = Math.max(...this.points.flatMap((point) => [point.current, point.previous]), 1);
    const spanX = this.width - this.padX * 2;
    const spanY = this.height - this.padY * 2;
    const x = this.padX + (index / Math.max(this.points.length - 1, 1)) * spanX;
    const y = this.height - this.padY - (value / max) * spanY;
    return { x, y };
  }
}

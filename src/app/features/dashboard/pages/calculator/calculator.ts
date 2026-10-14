import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

const VAT_RATE = 0.21;
const WITHHOLDING_RATE = 0.15;


@Component({
  selector: 'app-dashboard-calculator',
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCalculator {
  readonly months = signal(4);
  readonly students = signal(10);
  readonly price = signal(1350);
  readonly expenses = signal(600);
  readonly marketing = signal(200);

  readonly vatRate = VAT_RATE;
  readonly withholdingRate = WITHHOLDING_RATE;

  readonly revenue = computed(() => this.price() * this.students());
  readonly vat = computed(() => this.revenue() * VAT_RATE);
  readonly withholding = computed(() => this.revenue() * WITHHOLDING_RATE);
  readonly net = computed(() => this.revenue() - this.withholding());
  readonly expenseTotal = computed(() => this.expenses() * this.months());
  readonly marketingTotal = computed(() => this.marketing() * this.months());
  readonly costs = computed(() => this.expenseTotal() + this.marketingTotal());
  readonly profit = computed(() => this.net() - this.costs());
  readonly profitable = computed(() => this.profit() >= 0);

  readonly minPrice = computed(() => {
    const students = this.students();
    if (students <= 0) {
      return 0;
    }
    return this.costs() / ((1 - WITHHOLDING_RATE) * students);
  });

  readonly minStudents = computed(() => {
    const kept = this.price() * (1 - WITHHOLDING_RATE);
    if (kept <= 0) {
      return 0;
    }
    return Math.ceil(this.costs() / kept);
  });

  setMonths(value: string): void {
    this.months.set(this.clamp(value, 1, 12));
  }

  setStudents(value: string): void {
    this.students.set(this.clamp(value, 1, 40));
  }

  setPrice(value: string): void {
    this.price.set(this.clamp(value, 0, 20000));
  }

  setExpenses(value: string): void {
    this.expenses.set(this.clamp(value, 0, 20000));
  }

  setMarketing(value: string): void {
    this.marketing.set(this.clamp(value, 0, 20000));
  }

  money(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  private clamp(value: string, min: number, max: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return min;
    }
    return Math.min(max, Math.max(min, parsed));
  }
}

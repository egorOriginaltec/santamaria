import { TestBed } from '@angular/core/testing';
import { DashboardCalculator } from './calculator';

describe('DashboardCalculator', () => {
  it('keeps 85% of the price after the 15% withholding and compares it with monthly costs', () => {
    const fixture = TestBed.createComponent(DashboardCalculator);
    const calculator = fixture.componentInstance;

    calculator.months.set(4);
    calculator.students.set(10);
    calculator.price.set(1350);
    calculator.expenses.set(600);
    calculator.marketing.set(200);

    expect(calculator.withholding()).toBeCloseTo(1350 * 10 * 0.15);
    expect(calculator.vat()).toBeCloseTo(1350 * 10 * 0.21);
    expect(calculator.net()).toBeCloseTo(1350 * 10 * 0.85);
    expect(calculator.costs()).toBe(800 * 4);
    expect(calculator.profitable()).toBe(true);
  });
});

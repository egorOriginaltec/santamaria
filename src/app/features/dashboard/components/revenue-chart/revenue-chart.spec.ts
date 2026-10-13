import { TestBed } from '@angular/core/testing';
import { DashboardRevenueChart } from './revenue-chart';

describe('DashboardRevenueChart', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRevenueChart],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardRevenueChart);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should build svg paths for current and previous series', () => {
    const fixture = TestBed.createComponent(DashboardRevenueChart);
    const component = fixture.componentInstance;

    expect(component.currentPath.startsWith('M')).toBe(true);
    expect(component.previousPath.startsWith('M')).toBe(true);
    expect(component.currentArea.includes('Z')).toBe(true);
  });
});

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
    fixture.componentRef.setInput('points', [
      { label: 'Lun', paid: 10, previous_paid: 4, students: 1, previous_students: 0 },
      { label: 'Mar', paid: 20, previous_paid: 8, students: 2, previous_students: 1 },
    ]);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.currentPath.startsWith('M')).toBe(true);
    expect(component.previousPath.startsWith('M')).toBe(true);
    expect(component.currentArea.includes('Z')).toBe(true);
  });
});

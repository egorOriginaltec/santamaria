import { TestBed } from '@angular/core/testing';
import { DashboardEnrollmentBreakdown } from './enrollment-breakdown';

describe('DashboardEnrollmentBreakdown', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEnrollmentBreakdown],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardEnrollmentBreakdown);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should build a conic gradient from slices', () => {
    const fixture = TestBed.createComponent(DashboardEnrollmentBreakdown);
    const gradient = fixture.componentInstance.gradient;

    expect(gradient.startsWith('conic-gradient(')).toBe(true);
    expect(gradient.includes('%')).toBe(true);
  });
});

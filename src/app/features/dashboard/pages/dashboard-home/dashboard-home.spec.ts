import { TestBed } from '@angular/core/testing';
import { DashboardHome } from './dashboard-home';

describe('DashboardHome', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHome],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardHome);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render key dashboard sections', () => {
    const fixture = TestBed.createComponent(DashboardHome);
    fixture.detectChanges();

    const native: HTMLElement = fixture.nativeElement;
    expect(native.querySelector('app-dashboard-stats-cards')).toBeTruthy();
    expect(native.querySelector('app-dashboard-revenue-chart')).toBeTruthy();
    expect(native.querySelector('app-dashboard-enrollment-breakdown')).toBeTruthy();
    expect(native.querySelector('app-dashboard-recent-students')).toBeTruthy();
  });
});

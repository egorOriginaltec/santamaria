import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardLayout } from './dashboard-layout';

describe('DashboardLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayout],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardLayout);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should open and close the mobile menu', () => {
    const fixture = TestBed.createComponent(DashboardLayout);
    const component = fixture.componentInstance;

    component.openMenu();
    expect(component.menuOpen()).toBe(true);

    component.closeMenu();
    expect(component.menuOpen()).toBe(false);
  });
});

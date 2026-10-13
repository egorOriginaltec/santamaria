import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardTopbar } from './topbar';

describe('DashboardTopbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopbar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardTopbar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit menuToggle', () => {
    const fixture = TestBed.createComponent(DashboardTopbar);
    const component = fixture.componentInstance;
    let emitted = false;

    component.menuToggle.subscribe(() => {
      emitted = true;
    });

    component.toggleMenu();
    expect(emitted).toBe(true);
  });
});

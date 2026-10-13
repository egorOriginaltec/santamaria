import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DashboardSidebar } from './sidebar';

describe('DashboardSidebar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSidebar],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardSidebar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose navigation groups', () => {
    const fixture = TestBed.createComponent(DashboardSidebar);
    expect(fixture.componentInstance.groups().length).toBeGreaterThan(0);
  });

  it('should emit closed when close is called', () => {
    const fixture = TestBed.createComponent(DashboardSidebar);
    const component = fixture.componentInstance;
    let emitted = false;

    component.closed.subscribe(() => {
      emitted = true;
    });

    component.close();
    expect(emitted).toBe(true);
  });
});

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardRecentStudents } from './recent-students';

describe('DashboardRecentStudents', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentStudents],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardRecentStudents);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should map status labels', () => {
    const fixture = TestBed.createComponent(DashboardRecentStudents);
    const component = fixture.componentInstance;

    expect(component.statusLabel(true)).toBe('Activo');
    expect(component.statusLabel(false)).toBe('Inactivo');
  });

  it('should render student rows', () => {
    const fixture = TestBed.createComponent(DashboardRecentStudents);
    fixture.componentRef.setInput('rows', [
      {
        uuid: '1',
        email: 'ana@example.com',
        courses: 'Full Stack',
        joinedAt: '13 oct 2026',
        active: true,
        paid: '100,00 €',
      },
    ]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
  });
});

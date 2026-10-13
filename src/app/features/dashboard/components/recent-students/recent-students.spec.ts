import { TestBed } from '@angular/core/testing';
import { DashboardRecentStudents } from './recent-students';

describe('DashboardRecentStudents', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentStudents],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardRecentStudents);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should map status labels', () => {
    const fixture = TestBed.createComponent(DashboardRecentStudents);
    const component = fixture.componentInstance;

    expect(component.statusLabel('active')).toBe('Active');
    expect(component.statusLabel('pending')).toBe('Pending');
    expect(component.statusLabel('completed')).toBe('Completed');
  });

  it('should render student rows', () => {
    const fixture = TestBed.createComponent(DashboardRecentStudents);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(componentRows(fixture.componentInstance));
  });
});

function componentRows(component: DashboardRecentStudents): number {
  return component.rows.length;
}

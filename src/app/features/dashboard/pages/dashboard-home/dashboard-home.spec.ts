import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardSummary } from '@core/services/dashboard-api.service';
import { DashboardHome } from './dashboard-home';

const SUMMARY: DashboardSummary = {
  label: '1 oct – 31 oct 2026',
  comparison: { current: '1 oct – 31 oct 2026', previous: '1 sep – 30 sep 2026' },
  range: { from: '2026-10-01', to: '2026-10-31' },
  billing: {
    paid: 300,
    pending: 80,
    refunded: 20,
    net: 280,
    count: 4,
    paid_count: 2,
    payers: 1,
    average: 150,
    previous_paid: 100,
    delta: 200,
  },
  subscriptions: {
    count: 2,
    months: 1,
    due: 108,
    paid: 300,
    outstanding: 0,
    coverage: 277.8,
    items: [
      {
        uuid: 'sub-1',
        email: 'ana@example.com',
        monthly_amount: 49,
        due: 49,
        months: 1,
        status: 'active',
        starts_on: '2026-10-01',
      },
    ],
  },
  students: { new: 1, active: 2, inactive: 0, previous_new: 1, delta: 0 },
  enrollments: { count: 1, previous: 0, delta: 100 },
  courses_active: 1,
  leads: { open: 1, previous: 0, delta: 100 },
  series: [
    { label: '1', paid: 0, previous_paid: 0, students: 0, previous_students: 0 },
    { label: '2', paid: 200, previous_paid: 0, students: 0, previous_students: 0 },
  ],
  courses: [{ title: 'Bootcamp Full Stack', paid: 300, students: 1 }],
  recent_payments: [
    {
      uuid: 'pay-1',
      email: 'ana@example.com',
      course: 'Bootcamp Full Stack',
      amount: 200,
      status: 'paid',
      paid_on: '2026-10-02',
    },
  ],
  recent_students: [
    {
      uuid: 'stu-1',
      email: 'ana@example.com',
      is_active: true,
      courses: ['Bootcamp Full Stack'],
      created_at: '2026-10-13',
      paid: 300,
    },
  ],
};

describe('DashboardHome', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHome],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardHome);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render billing, students and the period filter', () => {
    const fixture = TestBed.createComponent(DashboardHome);
    fixture.detectChanges();

    const http = TestBed.inject(HttpTestingController);
    const request = http.expectOne((req) => req.url.includes('/api/v1/dashboard'));
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const lastDay = String(new Date(year, now.getMonth() + 1, 0).getDate()).padStart(2, '0');
    expect(request.request.params.get('from')).toBe(`${year}-${month}-01`);
    expect(request.request.params.get('to')).toBe(`${year}-${month}-${lastDay}`);
    request.flush({ data: SUMMARY });
    fixture.detectChanges();

    const native: HTMLElement = fixture.nativeElement;
    expect(native.textContent).toContain('Tendrías que facturar');
    expect(native.textContent).toContain('A facturar');
    expect(native.textContent).toContain('Cobrado');
    expect(native.textContent).toContain('Pendiente');
    expect(native.textContent).not.toContain('Neto');
    expect(native.textContent).toContain('300,00');
    expect(native.textContent).toContain('ana@example.com');
    expect(native.querySelector('app-dashboard-stats-cards')).toBeTruthy();
    expect(native.querySelector('app-dashboard-revenue-chart')).toBeTruthy();
    expect(native.querySelector('app-dashboard-enrollment-breakdown')).toBeTruthy();
    expect(native.querySelector('app-dashboard-recent-students')).toBeTruthy();

    http.verify();
  });
});

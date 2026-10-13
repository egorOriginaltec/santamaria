import { TestBed } from '@angular/core/testing';
import { DashboardStatCard, DashboardStatsCards } from './stats-cards';

const STATS: readonly DashboardStatCard[] = [
  { id: 'paid', label: 'Facturado', value: '300,00 €', hint: '2 cobrados', delta: '+10%', trend: 'up', accent: '#5751e1' },
  { id: 'pending', label: 'Pendiente', value: '80,00 €', hint: 'Por cobrar', delta: null, trend: 'flat', accent: '#e59a1a' },
  { id: 'students', label: 'Estudiantes', value: '1', hint: '2 activos', delta: '0%', trend: 'flat', accent: '#22a06b' },
  { id: 'enrollments', label: 'Matrículas', value: '1', hint: 'Altas', delta: '-5%', trend: 'down', accent: '#2f6fed' },
];

describe('DashboardStatsCards', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStatsCards],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardStatsCards);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render four metric cards', () => {
    const fixture = TestBed.createComponent(DashboardStatsCards);
    fixture.componentRef.setInput('stats', STATS);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('article.stat-card');
    expect(cards.length).toBe(4);
  });
});

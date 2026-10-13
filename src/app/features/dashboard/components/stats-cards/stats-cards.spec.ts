import { TestBed } from '@angular/core/testing';
import { DashboardStatsCards } from './stats-cards';

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
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('article.stat-card');
    expect(cards.length).toBe(4);
  });
});

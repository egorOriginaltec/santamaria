import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardSectionPage } from './section-page';

describe('DashboardSectionPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSectionPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              title: 'Students',
              description: 'Manage enrolled students.',
            }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardSectionPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should read title from route data', () => {
    const fixture = TestBed.createComponent(DashboardSectionPage);
    fixture.detectChanges();

    expect(fixture.componentInstance.title()).toBe('Students');
    expect(fixture.nativeElement.textContent).toContain('Students');
  });
});

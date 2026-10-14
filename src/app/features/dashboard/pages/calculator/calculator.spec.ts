import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthApiService } from '@core/services/auth-api.service';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { DashboardCalculator } from './calculator';

const scratch: CourseDto = {
  id: 1,
  uuid: 'scratch-uuid',
  title: 'Programación con Scratch',
  description: '',
  start_date: '2026-12-01',
  end_date: '2027-06-15',
  schedule_start: '17:30',
  schedule_end: '18:30',
  weekdays: [1],
  weekdays_label: 'L',
  price: 49,
  schedule: '17:30–18:30',
  is_active: true,
  created_at: null,
  updated_at: null,
};

describe('DashboardCalculator', () => {
  it('multiplies students by course price then subtracts 21% VAT and 15% withholding', () => {
    TestBed.configureTestingModule({
      imports: [DashboardCalculator],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthApiService, useValue: { me: () => of({ id: 1 }) } },
        {
          provide: CoursesApiService,
          useValue: {
            list: () => of({ data: [scratch] }),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(DashboardCalculator);
    const calculator = fixture.componentInstance;
    fixture.detectChanges();

    calculator.setStudents(scratch.uuid, '10');

    expect(calculator.gross()).toBe(490);
    expect(calculator.vat()).toBeCloseTo(102.9);
    expect(calculator.withholding()).toBeCloseTo(73.5);
    expect(calculator.net()).toBeCloseTo(313.6);
  });
});

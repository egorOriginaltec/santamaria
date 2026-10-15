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
  function createCalculator(): DashboardCalculator {
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
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('splits included VAT correctly for one and many students', () => {
    const calculator = createCalculator();
    calculator.setVatTreatment('included');
    calculator.setVatRatePercent('21');

    calculator.setStudents(scratch.uuid, '1');
    expect(calculator.totalCharged()).toBe(49);
    expect(calculator.taxableBase()).toBeCloseTo(40.5, 2);
    expect(calculator.vatRepercutido()).toBeCloseTo(8.5, 2);

    calculator.setStudents(scratch.uuid, '32');
    expect(calculator.totalCharged()).toBe(1568);
    expect(calculator.taxableBase()).toBeCloseTo(1295.87, 2);
    expect(calculator.vatRepercutido()).toBeCloseTo(272.13, 2);
    expect(calculator.afterVat()).toBeCloseTo(1295.87, 2);
  });

  it('adds VAT on top of the catalog price', () => {
    const calculator = createCalculator();
    calculator.setVatTreatment('added');
    calculator.setVatRatePercent('21');
    calculator.setStudents(scratch.uuid, '1');

    expect(calculator.taxableBase()).toBe(49);
    expect(calculator.vatRepercutido()).toBeCloseTo(10.29, 2);
    expect(calculator.totalCharged()).toBeCloseTo(59.29, 2);
  });

  it('does not break down VAT when the activity is exempt', () => {
    const calculator = createCalculator();
    calculator.setVatTreatment('exempt');
    calculator.setStudents(scratch.uuid, '10');

    expect(calculator.isVatExempt()).toBeTrue();
    expect(calculator.totalCharged()).toBe(490);
    expect(calculator.vatRepercutido()).toBe(0);
    expect(calculator.afterVat()).toBe(490);
  });

  it('does not apply automatic IRPF withholding on family payments', () => {
    const calculator = createCalculator();
    calculator.setVatTreatment('included');
    calculator.setStudents(scratch.uuid, '10');

    expect(calculator.withholdingAmount()).toBe(0);
    expect(calculator.net()).toBe(calculator.afterVat());

    calculator.setOptionalWithholding('50');
    expect(calculator.net()).toBeCloseTo(calculator.afterVat() - 50, 2);
  });

  it('subtracts monthly teacher and other expenses', () => {
    const calculator = createCalculator();
    calculator.setVatTreatment('exempt');
    calculator.setStudents(scratch.uuid, '10');
    calculator.setTeacherHours('10');
    calculator.setTeacherRate('12');
    calculator.setOtherMonthlyExpenses('30');

    expect(calculator.teacherCost()).toBe(120);
    expect(calculator.monthlyExpenses()).toBe(150);
    expect(calculator.net()).toBe(340);
  });
});

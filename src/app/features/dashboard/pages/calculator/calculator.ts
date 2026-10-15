import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { ToastService } from '@core/services/toast.service';
import { finalize } from 'rxjs';

/** Provisional default — confirm with a gestoría. Not a legal determination. */
const DEFAULT_VAT_RATE = 0.21;
const DEFAULT_TEACHER_RATE = 12;

export type VatTreatment = 'included' | 'added' | 'exempt';

export interface CalculatorLine {
  readonly course: CourseDto;
  readonly students: number;
  /** Catalog unit price (as stored on the course). */
  readonly unitPrice: number;
  /** Amount families pay for this line (final price × students). */
  readonly charged: number;
  /** Taxable base for this line (0 when exempt). */
  readonly taxableBase: number;
  /** Output VAT for this line (0 when exempt). */
  readonly vatAmount: number;
}

@Component({
  selector: 'app-dashboard-calculator',
  imports: [RouterLink],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCalculator implements OnInit {
  private readonly coursesApi = inject(CoursesApiService);
  private readonly authApi = inject(AuthApiService);
  private readonly toast = inject(ToastService);

  readonly vatTreatments: readonly { value: VatTreatment; label: string }[] = [
    { value: 'included', label: 'IVA incluido en el precio' },
    { value: 'added', label: 'IVA añadido al precio' },
    { value: 'exempt', label: 'Actividad exenta de IVA' },
  ];

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  readonly courses = signal<readonly CourseDto[]>([]);
  readonly counts = signal<Readonly<Record<string, number>>>({});
  readonly vatTreatment = signal<VatTreatment>('included');
  /** Fraction, e.g. 0.21. Provisional until fiscal confirmation. */
  readonly vatRate = signal(DEFAULT_VAT_RATE);
  /** Optional IRPF withholdings practiced on specific invoices (€). */
  readonly optionalWithholding = signal(0);
  readonly teacherHours = signal(0);
  readonly teacherRate = signal(DEFAULT_TEACHER_RATE);
  readonly otherMonthlyExpenses = signal(0);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);

  readonly isVatExempt = computed(() => this.vatTreatment() === 'exempt');

  readonly lines = computed<readonly CalculatorLine[]>(() => {
    const counts = this.counts();
    const treatment = this.vatTreatment();
    const rate = this.vatRate();

    return this.courses().map((course) => {
      const students = counts[course.uuid] ?? 0;
      const unitPrice = course.price;
      const breakdown = this.lineBreakdown(unitPrice, students, treatment, rate);

      return {
        course,
        students,
        unitPrice,
        ...breakdown,
      };
    });
  });

  readonly studentTotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.students, 0),
  );

  /** Sum of what families pay (before optional withholdings). */
  readonly totalCharged = computed(() =>
    this.roundMoney(this.lines().reduce((sum, line) => sum + line.charged, 0)),
  );

  readonly taxableBase = computed(() =>
    this.roundMoney(this.lines().reduce((sum, line) => sum + line.taxableBase, 0)),
  );

  readonly vatRepercutido = computed(() =>
    this.roundMoney(this.lines().reduce((sum, line) => sum + line.vatAmount, 0)),
  );

  /**
   * Cash available after settling output VAT (when applicable).
   * Exempt activity: full charged amount. Subject to VAT: taxable base.
   */
  readonly afterVat = computed(() =>
    this.isVatExempt() ? this.totalCharged() : this.taxableBase(),
  );

  readonly teacherCost = computed(() =>
    this.roundMoney(Math.max(0, this.teacherHours()) * Math.max(0, this.teacherRate())),
  );

  readonly monthlyExpenses = computed(() =>
    this.roundMoney(this.teacherCost() + Math.max(0, this.otherMonthlyExpenses())),
  );

  readonly withholdingAmount = computed(() => Math.max(0, this.optionalWithholding()));

  /** Orientative liquidity after VAT settlement, optional withholdings and monthly costs. */
  readonly net = computed(() =>
    this.roundMoney(this.afterVat() - this.withholdingAmount() - this.monthlyExpenses()),
  );

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.toast.error('Inicia sesión como administrador para usar la calculadora.');
        return;
      }

      this.loading.set(true);

      this.coursesApi
        .list({ is_active: true, per_page: 50, sort: 'title' })
        .pipe(
          finalize(() => {
            this.loading.set(false);
            this.initialLoad.set(false);
          }),
        )
        .subscribe({
          next: (response) => {
            this.courses.set(response.data);
            this.counts.set(
              Object.fromEntries(response.data.map((course) => [course.uuid, 0])),
            );
          },
          error: (err: { status?: number }) => {
            this.courses.set([]);
            if (err.status === 401 || err.status === 403) {
              this.toast.error('No tienes permiso para ver los cursos.');
            }
          },
        });
    });
  }

  setStudents(uuid: string, value: string): void {
    this.counts.update((current) => ({
      ...current,
      [uuid]: this.parseNonNegativeInt(value),
    }));
  }

  setVatTreatment(value: string): void {
    if (value === 'included' || value === 'added' || value === 'exempt') {
      this.vatTreatment.set(value);
    }
  }

  setVatRatePercent(value: string): void {
    const percent = this.parseNonNegativeNumber(value);
    this.vatRate.set(Math.min(percent / 100, 1));
  }

  setOptionalWithholding(value: string): void {
    this.optionalWithholding.set(this.parseNonNegativeNumber(value));
  }

  setTeacherHours(value: string): void {
    this.teacherHours.set(this.parseNonNegativeNumber(value));
  }

  setTeacherRate(value: string): void {
    this.teacherRate.set(this.parseNonNegativeNumber(value));
  }

  setOtherMonthlyExpenses(value: string): void {
    this.otherMonthlyExpenses.set(this.parseNonNegativeNumber(value));
  }

  money(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  vatRatePercentLabel(): string {
    return `${this.roundMoney(this.vatRate() * 100)} %`;
  }

  vatRatePercentValue(): number {
    return this.roundMoney(this.vatRate() * 100);
  }

  priceHint(): string {
    switch (this.vatTreatment()) {
      case 'included':
        return 'El precio del curso se trata como final con IVA incluido.';
      case 'added':
        return 'El precio del curso es base imponible; el IVA se añade al cobro.';
      case 'exempt':
        return 'Actividad exenta: no se desglosa IVA repercutido (no es lo mismo que tipo 0 %).';
    }
  }

  /**
   * High-precision line math; monetary rounding applied at the end of each line.
   * Aggregates sum rounded line amounts so UI totals stay consistent.
   */
  private lineBreakdown(
    unitPrice: number,
    students: number,
    treatment: VatTreatment,
    rate: number,
  ): Pick<CalculatorLine, 'charged' | 'taxableBase' | 'vatAmount'> {
    const n = Math.max(0, students);
    const price = Math.max(0, unitPrice);
    const safeRate = Math.max(0, rate);

    if (n === 0 || price === 0) {
      return { charged: 0, taxableBase: 0, vatAmount: 0 };
    }

    if (treatment === 'exempt') {
      const charged = this.roundMoney(n * price);
      return { charged, taxableBase: charged, vatAmount: 0 };
    }

    if (treatment === 'included') {
      const charged = this.roundMoney(n * price);
      if (safeRate <= 0) {
        return { charged, taxableBase: charged, vatAmount: 0 };
      }
      const taxableBase = this.roundMoney(charged / (1 + safeRate));
      const vatAmount = this.roundMoney(charged - taxableBase);
      return { charged, taxableBase, vatAmount };
    }

    // added
    const taxableBase = this.roundMoney(n * price);
    const vatAmount = this.roundMoney(taxableBase * safeRate);
    const charged = this.roundMoney(taxableBase + vatAmount);
    return { charged, taxableBase, vatAmount };
  }

  private parseNonNegativeInt(value: string): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return 0;
    }

    return Math.max(0, Math.round(parsed));
  }

  private parseNonNegativeNumber(value: string): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return 0;
    }

    return Math.max(0, this.roundMoney(parsed));
  }

  private roundMoney(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}

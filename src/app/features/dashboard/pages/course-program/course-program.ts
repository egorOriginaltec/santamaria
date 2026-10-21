import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  CourseClassDto,
  CourseCurriculumApiService,
  CourseUnitDto,
} from '@core/services/course-curriculum-api.service';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import { finalize, forkJoin } from 'rxjs';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Component({
  selector: 'app-dashboard-course-program',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './course-program.html',
  styleUrl: './course-program.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCourseProgram implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly curriculumApi = inject(CourseCurriculumApiService);

  readonly course = signal<CourseDto | null>(null);
  readonly units = signal<readonly CourseUnitDto[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);
  readonly saving = signal(false);
  readonly selectedUnitUuid = signal<string | null>(null);
  readonly editingUnitUuid = signal<string | null>(null);
  readonly editingClassUuid = signal<string | null>(null);
  readonly showUnitForm = signal(false);
  readonly showClassForm = signal(false);
  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6] as const;

  readonly unitForm = this.fb.nonNullable.group({
    phase: ['', [Validators.required, Validators.maxLength(80)]],
    period: ['', [Validators.required, Validators.maxLength(80)]],
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(180)]],
    text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    sort_order: [1, [Validators.required, Validators.min(0), Validators.max(999)]],
  });

  readonly classForm = this.fb.nonNullable.group({
    date_label: ['', [Validators.required, Validators.maxLength(20)]],
    label: ['', [Validators.required, Validators.maxLength(40)]],
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(180)]],
    body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]],
    learns: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)]],
    result: [''],
    sort_order: [1, [Validators.required, Validators.min(0), Validators.max(999)]],
  });

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid || !UUID_RE.test(uuid)) {
      this.loading.set(false);
      this.loadFailed.set(true);
      return;
    }

    this.loading.set(true);
    this.loadFailed.set(false);

    forkJoin({
      course: this.coursesApi.get(uuid),
      units: this.curriculumApi.listUnits(uuid),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ course, units }) => {
          this.course.set(course);
          this.units.set(units);
          if (!this.selectedUnitUuid() && units.length > 0) {
            this.selectedUnitUuid.set(units[0].uuid);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loadFailed.set(true);
          this.toast.error(readApiError(err, 'No se pudo cargar el programa.'));
        },
      });
  }

  selectedUnit(): CourseUnitDto | null {
    const uuid = this.selectedUnitUuid();
    return this.units().find((unit) => unit.uuid === uuid) ?? null;
  }

  unitClasses(unit: CourseUnitDto): readonly CourseClassDto[] {
    return unit.classes ?? unit.sessions ?? [];
  }

  selectUnit(uuid: string): void {
    this.selectedUnitUuid.set(uuid);
    this.showClassForm.set(false);
    this.editingClassUuid.set(null);
  }

  openCreateUnit(): void {
    this.editingUnitUuid.set(null);
    this.unitForm.reset({
      phase: '',
      period: '',
      title: '',
      text: '',
      sort_order: this.units().length + 1,
    });
    this.showUnitForm.set(true);
  }

  openEditUnit(unit: CourseUnitDto): void {
    this.editingUnitUuid.set(unit.uuid);
    this.unitForm.reset({
      phase: unit.phase,
      period: unit.period,
      title: unit.title,
      text: unit.text,
      sort_order: unit.sort_order,
    });
    this.showUnitForm.set(true);
  }

  cancelUnitForm(): void {
    this.showUnitForm.set(false);
    this.editingUnitUuid.set(null);
  }

  saveUnit(): void {
    if (this.unitForm.invalid || !this.course()) {
      this.unitForm.markAllAsTouched();
      return;
    }

    const payload = this.unitForm.getRawValue();
    const courseUuid = this.course()!.uuid;
    const editUuid = this.editingUnitUuid();
    this.saving.set(true);

    const request$ = editUuid
      ? this.curriculumApi.updateUnit(courseUuid, editUuid, payload)
      : this.curriculumApi.createUnit(courseUuid, payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (unit) => {
        this.toast.success(editUuid ? 'Unidad actualizada.' : 'Unidad creada.');
        this.showUnitForm.set(false);
        this.editingUnitUuid.set(null);
        this.reloadQuiet(unit.uuid);
      },
      error: (err: HttpErrorResponse) => {
        this.toast.error(readApiError(err, 'No se pudo guardar la unidad.'));
      },
    });
  }

  deleteUnit(unit: CourseUnitDto): void {
    if (!this.course()) {
      return;
    }
    if (!confirm(`¿Eliminar la unidad «${unit.title}» y todas sus clases?`)) {
      return;
    }

    this.saving.set(true);
    this.curriculumApi
      .destroyUnit(this.course()!.uuid, unit.uuid)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Unidad eliminada.');
          if (this.selectedUnitUuid() === unit.uuid) {
            this.selectedUnitUuid.set(null);
          }
          this.reloadQuiet();
        },
        error: (err: HttpErrorResponse) => {
          this.toast.error(readApiError(err, 'No se pudo eliminar la unidad.'));
        },
      });
  }

  openCreateClass(): void {
    const unit = this.selectedUnit();
    if (!unit) {
      return;
    }
    this.editingClassUuid.set(null);
    this.classForm.reset({
      date_label: '',
      label: `Clase ${this.unitClasses(unit).length + 1}`,
      title: '',
      body: '',
      learns: '',
      result: '',
      sort_order: this.unitClasses(unit).length + 1,
    });
    this.showClassForm.set(true);
  }

  openEditClass(courseClass: CourseClassDto): void {
    this.editingClassUuid.set(courseClass.uuid);
    this.classForm.reset({
      date_label: courseClass.date_label || courseClass.date,
      label: courseClass.label,
      title: courseClass.title,
      body: courseClass.body || courseClass.text,
      learns: courseClass.learns,
      result: courseClass.result ?? '',
      sort_order: courseClass.sort_order,
    });
    this.showClassForm.set(true);
  }

  cancelClassForm(): void {
    this.showClassForm.set(false);
    this.editingClassUuid.set(null);
  }

  saveClass(): void {
    const unit = this.selectedUnit();
    if (this.classForm.invalid || !this.course() || !unit) {
      this.classForm.markAllAsTouched();
      return;
    }

    const raw = this.classForm.getRawValue();
    const payload = {
      ...raw,
      result: raw.result.trim() || null,
    };
    const courseUuid = this.course()!.uuid;
    const editUuid = this.editingClassUuid();
    this.saving.set(true);

    const request$ = editUuid
      ? this.curriculumApi.updateClass(courseUuid, unit.uuid, editUuid, payload)
      : this.curriculumApi.createClass(courseUuid, unit.uuid, payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.toast.success(editUuid ? 'Clase actualizada.' : 'Clase creada.');
        this.showClassForm.set(false);
        this.editingClassUuid.set(null);
        this.reloadQuiet(unit.uuid);
      },
      error: (err: HttpErrorResponse) => {
        this.toast.error(readApiError(err, 'No se pudo guardar la clase.'));
      },
    });
  }

  deleteClass(courseClass: CourseClassDto): void {
    const unit = this.selectedUnit();
    if (!this.course() || !unit) {
      return;
    }
    if (!confirm(`¿Eliminar «${courseClass.title}»?`)) {
      return;
    }

    this.saving.set(true);
    this.curriculumApi
      .destroyClass(this.course()!.uuid, unit.uuid, courseClass.uuid)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Clase eliminada.');
          this.reloadQuiet(unit.uuid);
        },
        error: (err: HttpErrorResponse) => {
          this.toast.error(readApiError(err, 'No se pudo eliminar la clase.'));
        },
      });
  }

  private reloadQuiet(selectUnitUuid?: string): void {
    const uuid = this.course()?.uuid;
    if (!uuid) {
      return;
    }

    this.curriculumApi.listUnits(uuid).subscribe({
      next: (units) => {
        this.units.set(units);
        if (selectUnitUuid) {
          this.selectedUnitUuid.set(selectUnitUuid);
        } else if (!this.selectedUnitUuid() && units.length > 0) {
          this.selectedUnitUuid.set(units[0].uuid);
        }
      },
    });
  }
}

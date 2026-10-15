import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { ToastService } from '@core/services/toast.service';
import {
  CourseSessionDto,
  CourseSessionsApiService,
  MaterialDto,
  materialFileError,
  readApiError,
} from '@core/services/course-sessions-api.service';

import { finalize, forkJoin } from 'rxjs';

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'] as const;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Component({
  selector: 'app-dashboard-course-classes',
  imports: [RouterLink],
  templateUrl: './course-classes.html',
  styleUrl: './course-classes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('classesEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate(
          '520ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'none' }),
        ),
      ]),
    ]),
  ],
})
export class DashboardCourseClasses implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly sessionsApi = inject(CourseSessionsApiService);

  readonly course = signal<CourseDto | null>(null);
  readonly sessions = signal<readonly CourseSessionDto[]>([]);
  readonly materials = signal<readonly MaterialDto[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);
  readonly uploading = signal(false);
  readonly busyUuid = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly authRequired = signal(false);
  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid || !UUID_RE.test(uuid)) {
      this.loading.set(false);
      this.loadFailed.set(true);
      this.course.set(null);
      this.setError('No se encontró el curso.');
      return;
    }

    this.loading.set(true);
    this.loadFailed.set(false);
    this.clearError();

    forkJoin({
      course: this.coursesApi.get(uuid),
      sessions: this.sessionsApi.list(uuid),
      materials: this.sessionsApi.listCourseMedia(uuid),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ course, sessions, materials }) => {
          this.course.set(course);
          this.sessions.set(sessions);
          this.materials.set(materials);
          this.loadFailed.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.course.set(null);
          this.sessions.set([]);
          this.materials.set([]);
          this.loadFailed.set(true);
          this.setError(
            readApiError(err, 'No se pudieron cargar las clases.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDeleteSession(session: CourseSessionDto): void {
    const course = this.course();
    if (!course || this.busyUuid()) {
      return;
    }

    const ok = window.confirm(`¿Eliminar la clase del ${this.formatDate(session.session_on)}?`);
    if (!ok) {
      return;
    }

    this.clearError();
    this.busyUuid.set(session.uuid);

    this.sessionsApi
      .destroy(course.uuid, session.uuid)
      .pipe(finalize(() => this.busyUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Clase eliminada.');
          this.reload();
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo eliminar la clase.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onCourseFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const course = this.course();

    if (!file || !course || this.uploading() || this.busyUuid()) {
      input.value = '';
      return;
    }

    const problem = materialFileError(file);
    if (problem) {
      input.value = '';
      this.setError(problem);
      return;
    }

    void file.arrayBuffer().then(
      (bytes) => {
        const upload = new File([bytes], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });
        input.value = '';
        this.uploading.set(true);
        this.clearError();

        this.sessionsApi
          .uploadCourseMedia(course.uuid, upload)
          .pipe(finalize(() => this.uploading.set(false)))
          .subscribe({
            next: () => {
              this.toast.success('Archivo subido.');
              this.reload();
            },
            error: (err: HttpErrorResponse) => {
              this.setError(
                readApiError(err, 'No se pudo subir el archivo.'),
                err.status === 401 || err.status === 403,
              );
            },
          });
      },
      () => {
        input.value = '';
        this.setError('No se pudo leer el archivo.');
      },
    );
  }

  onDeleteMedia(material: MaterialDto): void {
    if (this.busyUuid() || this.uploading()) {
      return;
    }

    const ok = window.confirm(`¿Eliminar “${material.name}”?`);
    if (!ok) {
      return;
    }

    this.clearError();
    this.busyUuid.set(material.uuid);

    this.sessionsApi
      .destroyMedia(material.uuid)
      .pipe(finalize(() => this.busyUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Archivo eliminado.');
          this.reload();
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo eliminar el archivo.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDownload(material: MaterialDto): void {
    if (this.busyUuid() || this.uploading()) {
      return;
    }

    this.clearError();
    this.busyUuid.set(material.uuid);

    this.sessionsApi
      .download(material.uuid)
      .pipe(finalize(() => this.busyUuid.set(null)))
      .subscribe({
        next: (blob) => {
          if (blob.type.includes('json') || blob.size === 0) {
            this.setError('No se pudo descargar el archivo.');
            return;
          }
          saveBlob(blob, material.name);
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo descargar el archivo.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  formatDate(value: string): string {
    const [year, month, day] = value.split('-');
    const label = MONTHS[Number(month) - 1] ?? month;
    return `${Number(day)} ${label} ${year}`;
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private setError(message: string, authRequired = false): void {
    this.authRequired.set(authRequired);
    this.toast.error(message);
  }

  private clearError(): void {
    this.authRequired.set(false);
  }
}

function saveBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}
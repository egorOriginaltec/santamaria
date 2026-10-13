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
import {
  CourseSessionDto,
  CourseSessionsApiService,
  MaterialDto,
  materialFileError,
  readApiError,
} from '@core/services/course-sessions-api.service';
import { finalize, forkJoin } from 'rxjs';

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'] as const;

@Component({
  selector: 'app-dashboard-course-classes',
  imports: [RouterLink],
  templateUrl: './course-classes.html',
  styleUrl: './course-classes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCourseClasses implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly sessionsApi = inject(CourseSessionsApiService);

  readonly course = signal<CourseDto | null>(null);
  readonly sessions = signal<readonly CourseSessionDto[]>([]);
  readonly materials = signal<readonly MaterialDto[]>([]);
  readonly loading = signal(true);
  readonly uploading = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.loading.set(false);
      this.errorMessage.set('No se encontró el curso.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

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
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 403) {
            this.errorMessage.set('No tienes permiso para gestionar las clases de este curso.');
            return;
          }
          this.errorMessage.set('No se pudieron cargar las clases.');
        },
      });
  }

  onDeleteSession(session: CourseSessionDto): void {
    const course = this.course();
    if (!course) {
      return;
    }

    const ok = window.confirm(`¿Eliminar la clase del ${this.formatDate(session.session_on)}?`);
    if (!ok) {
      return;
    }

    this.sessionsApi.destroy(course.uuid, session.uuid).subscribe({
      next: () => {
        this.successMessage.set('Clase eliminada.');
        this.reload();
      },
      error: () => this.errorMessage.set('No se pudo eliminar la clase.'),
    });
  }

  onCourseFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const course = this.course();
    if (!file || !course || this.uploading()) {
      input.value = '';
      return;
    }

    const problem = materialFileError(file);
    if (problem) {
      input.value = '';
      this.successMessage.set(null);
      this.errorMessage.set(problem);
      return;
    }

    void file.arrayBuffer().then(
      (bytes) => {
        const upload = new File([bytes], file.name, { type: file.type, lastModified: file.lastModified });
        input.value = '';
        this.uploading.set('course');
        this.errorMessage.set(null);
        this.successMessage.set(null);
        this.sessionsApi
          .uploadCourseMedia(course.uuid, upload)
          .pipe(finalize(() => this.uploading.set(null)))
          .subscribe({
            next: () => {
              this.successMessage.set('Archivo subido.');
              this.reload();
            },
            error: (err: HttpErrorResponse) => {
              this.errorMessage.set(readApiError(err, 'No se pudo subir el archivo.'));
            },
          });
      },
      () => {
        input.value = '';
        this.errorMessage.set('No se pudo leer el archivo.');
      },
    );
  }

  onDeleteMedia(material: MaterialDto): void {
    const ok = window.confirm(`¿Eliminar “${material.name}”?`);
    if (!ok) {
      return;
    }

    this.sessionsApi.destroyMedia(material.uuid).subscribe({
      next: () => {
        this.successMessage.set('Archivo eliminado.');
        this.reload();
      },
      error: () => this.errorMessage.set('No se pudo eliminar el archivo.'),
    });
  }

  onDownload(material: MaterialDto): void {
    this.sessionsApi.download(material.uuid).subscribe({
      next: (blob) => saveBlob(blob, material.name),
      error: () => this.errorMessage.set('No se pudo descargar el archivo.'),
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
}

function saveBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

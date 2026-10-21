import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthApiService } from '@core/services/auth-api.service';
import { readApiError } from '@core/services/course-sessions-api.service';
import {
  JobApplicationDto,
  JobApplicationMediaDto,
  JobApplicationPeriod,
  JobApplicationSort,
  JobApplicationStatus,
  JobApplicationsApiService,
  JobApplicationsListOptions,
} from '@core/services/job-applications-api.service';
import { ToastService } from '@core/services/toast.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-dashboard-job-applications',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './job-applications.html',
  styleUrl: './job-applications.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardJobApplications implements OnInit, OnDestroy {
  private readonly api = inject(JobApplicationsApiService);
  private readonly toast = inject(ToastService);
  private readonly authApi = inject(AuthApiService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly statusControl = new FormControl<JobApplicationStatus | ''>('', {
    nonNullable: true,
  });
  readonly periodControl = new FormControl<JobApplicationPeriod>('week', {
    nonNullable: true,
  });
  readonly sortControl = new FormControl<JobApplicationSort>('priority', {
    nonNullable: true,
  });
  readonly perPageControl = new FormControl('10', { nonNullable: true });

  readonly applications = signal<readonly JobApplicationDto[]>([]);
  readonly loading = signal(true);
  readonly initialLoad = signal(true);
  readonly authRequired = signal(false);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly from = signal<number | null>(null);
  readonly to = signal<number | null>(null);
  readonly updatingUuid = signal<string | null>(null);
  readonly downloadingKey = signal<string | null>(null);
  readonly previewingKey = signal<string | null>(null);
  readonly openStatusMenuUuid = signal<string | null>(null);
  readonly expandedUuid = signal<string | null>(null);
  readonly preview = signal<{
    readonly application: JobApplicationDto;
    readonly media: JobApplicationMediaDto;
    readonly objectUrl: string;
    readonly safeUrl: SafeResourceUrl;
    readonly kind: 'pdf' | 'image' | 'unsupported';
  } | null>(null);
  readonly options = signal<JobApplicationsListOptions>({
    statuses: ['new', 'reviewing', 'interview', 'rejected', 'hired'],
    periods: ['week', 'month', 'all'],
    sorts: ['priority', 'latest'],
    per_page_options: [10, 20, 50],
  });

  readonly skeletonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  @HostListener('document:click')
  onDocumentClick(): void {
    this.openStatusMenuUuid.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.preview()) {
      this.closePreview();
    }
  }

  ngOnDestroy(): void {
    this.closePreview();
  }

  ngOnInit(): void {
    this.authApi.me().subscribe((user) => {
      if (!user) {
        this.loading.set(false);
        this.initialLoad.set(false);
        this.setError('Inicia sesión como administrador para ver los currículums.', true);
        return;
      }

      this.reload(1);

      merge(
        this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
        this.statusControl.valueChanges,
        this.periodControl.valueChanges,
        this.sortControl.valueChanges,
        this.perPageControl.valueChanges,
      )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.reload(1));
    });
  }

  reload(page = this.currentPage()): void {
    this.loading.set(true);
    this.clearError();
    this.openStatusMenuUuid.set(null);

    this.api
      .list({
        search: this.searchControl.value.trim() || undefined,
        status: this.statusControl.value || undefined,
        period: this.periodControl.value,
        sort: this.sortControl.value,
        per_page: Number(this.perPageControl.value) || 10,
        page,
      })
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.initialLoad.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.applications.set(response.data);
          this.total.set(response.meta?.total ?? response.data.length);
          this.currentPage.set(response.meta?.current_page ?? page);
          this.lastPage.set(response.meta?.last_page ?? 1);
          this.from.set(response.meta?.from ?? null);
          this.to.set(response.meta?.to ?? null);
          if (response.options) {
            this.options.set(response.options);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.applications.set([]);
          this.setError(
            readApiError(err, 'No se pudieron cargar los currículums.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage() || page === this.currentPage()) {
      return;
    }
    this.reload(page);
  }

  toggleExpanded(uuid: string): void {
    this.expandedUuid.update((current) => (current === uuid ? null : uuid));
  }

  toggleStatusMenu(uuid: string, event: Event): void {
    event.stopPropagation();
    this.openStatusMenuUuid.update((current) => (current === uuid ? null : uuid));
  }

  setStatus(application: JobApplicationDto, status: JobApplicationStatus, event: Event): void {
    event.stopPropagation();
    this.openStatusMenuUuid.set(null);

    if (status === application.status) {
      return;
    }

    this.clearError();
    this.updatingUuid.set(application.uuid);

    this.api
      .update(application.uuid, { status })
      .pipe(finalize(() => this.updatingUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Estado actualizado.');
          this.reload(this.currentPage());
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo actualizar el estado.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  onDelete(application: JobApplicationDto): void {
    const ok = window.confirm(
      `¿Eliminar la candidatura de ${application.name}? Se borrarán también el CV y adjuntos.`,
    );
    if (!ok) {
      return;
    }

    this.clearError();
    this.updatingUuid.set(application.uuid);

    this.api
      .destroy(application.uuid)
      .pipe(finalize(() => this.updatingUuid.set(null)))
      .subscribe({
        next: () => {
          this.toast.success('Candidatura eliminada.');
          const nextPage =
            this.applications().length === 1 && this.currentPage() > 1
              ? this.currentPage() - 1
              : this.currentPage();
          this.reload(nextPage);
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo eliminar la candidatura.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  downloadFile(application: JobApplicationDto, media: JobApplicationMediaDto | null): void {
    if (!media) {
      this.toast.error('No hay archivo disponible.');
      return;
    }

    const key = `${application.uuid}:${media.uuid}`;
    this.downloadingKey.set(key);
    this.clearError();

    this.api
      .downloadMedia(application.uuid, media.uuid)
      .pipe(finalize(() => this.downloadingKey.set(null)))
      .subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = media.name || 'curriculum.pdf';
          anchor.click();
          URL.revokeObjectURL(url);
          this.toast.success('Descarga iniciada.');
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo descargar el archivo.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  previewFile(application: JobApplicationDto, media: JobApplicationMediaDto | null): void {
    if (!media) {
      this.toast.error('No hay archivo disponible.');
      return;
    }

    const key = `${application.uuid}:${media.uuid}`;
    this.previewingKey.set(key);
    this.clearError();

    this.api
      .downloadMedia(application.uuid, media.uuid)
      .pipe(finalize(() => this.previewingKey.set(null)))
      .subscribe({
        next: (blob) => {
          const kind = this.previewKind(media, blob);
          const typedBlob =
            kind === 'pdf' && !blob.type
              ? new Blob([blob], { type: 'application/pdf' })
              : blob;
          const objectUrl = URL.createObjectURL(typedBlob);
          this.closePreview();
          this.preview.set({
            application,
            media,
            objectUrl,
            safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl),
            kind,
          });
          document.body.style.overflow = 'hidden';
        },
        error: (err: HttpErrorResponse) => {
          this.setError(
            readApiError(err, 'No se pudo abrir la previsualización.'),
            err.status === 401 || err.status === 403,
          );
        },
      });
  }

  closePreview(): void {
    const current = this.preview();
    if (current?.objectUrl) {
      URL.revokeObjectURL(current.objectUrl);
    }
    this.preview.set(null);
    document.body.style.overflow = '';
  }

  downloadFromPreview(): void {
    const current = this.preview();
    if (!current) {
      return;
    }
    this.downloadFile(current.application, current.media);
  }

  isDownloading(applicationUuid: string, mediaUuid: string): boolean {
    return this.downloadingKey() === `${applicationUuid}:${mediaUuid}`;
  }

  isPreviewing(applicationUuid: string, mediaUuid: string): boolean {
    return this.previewingKey() === `${applicationUuid}:${mediaUuid}`;
  }

  private previewKind(
    media: JobApplicationMediaDto,
    blob?: Blob,
  ): 'pdf' | 'image' | 'unsupported' {
    const mime = (blob?.type || media.mime_type || '').toLowerCase();
    const name = (media.name || '').toLowerCase();

    if (mime.includes('pdf') || name.endsWith('.pdf')) {
      return 'pdf';
    }
    if (
      mime.startsWith('image/') ||
      /\.(png|jpe?g|webp|gif)$/i.test(name)
    ) {
      return 'image';
    }
    return 'unsupported';
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'new':
        return 'Nuevo';
      case 'reviewing':
        return 'En revisión';
      case 'interview':
        return 'Entrevista';
      case 'rejected':
        return 'Descartado';
      case 'hired':
        return 'Contratado';
      default:
        return status;
    }
  }

  periodLabel(period: JobApplicationPeriod): string {
    switch (period) {
      case 'week':
        return 'Última semana';
      case 'month':
        return 'Último mes';
      case 'all':
        return 'Todo';
    }
  }

  sortLabel(sort: JobApplicationSort): string {
    return sort === 'priority' ? 'Prioridad' : 'Más recientes';
  }

  initials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  pageNumbers(): number[] {
    const last = this.lastPage();
    const current = this.currentPage();
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(last, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    const pages: number[] = [];
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }
    return pages;
  }

  private setError(message: string, authRequired = false): void {
    this.authRequired.set(authRequired);
    this.toast.error(message);
  }

  private clearError(): void {
    this.authRequired.set(false);
  }
}

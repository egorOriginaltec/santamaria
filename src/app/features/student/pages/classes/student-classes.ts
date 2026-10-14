import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialDto } from '@core/services/course-sessions-api.service';
import { StudentCampusService } from '../../data/student-campus.service';
import { formatNice, todayIso } from '../../student-schedule';

@Component({
  selector: 'app-student-classes',
  imports: [RouterLink],
  templateUrl: './student-classes.html',
  styleUrls: ['../../student-ui.css', './student-classes.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentClasses {
  private readonly campus = inject(StudentCampusService);

  readonly loading = this.campus.loading;
  readonly errorMessage = this.campus.error;
  readonly upcoming = this.campus.upcoming;
  readonly recent = this.campus.recent;
  readonly todayIso = todayIso();
  readonly formatNice = formatNice;
  readonly downloadError = signal<string | null>(null);
  readonly skeletonRows = [0, 1, 2, 3] as const;

  readonly empty = computed(
    () => this.upcoming().length === 0 && this.recent().length === 0 && this.campus.courses().length === 0,
  );

  constructor() {
    this.campus.ensure();
  }

  occurrenceKey(courseUuid: string, iso: string): string {
    return `${courseUuid}-${iso}`;
  }

  download(material: MaterialDto): void {
    this.downloadError.set(null);
    this.campus.download(material).subscribe({
      error: () => this.downloadError.set('No se pudo descargar el archivo.'),
    });
  }
}

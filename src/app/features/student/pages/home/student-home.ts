import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppAlert } from '@shared/components/alert/alert';
import { AuthApiService } from '@core/services/auth-api.service';
import { StudentCampusService } from '../../data/student-campus.service';
import { studentContentEnter } from '../../student-enter.animation';
import { firstName, formatNice, todayIso } from '../../student-schedule';

@Component({
  selector: 'app-student-home',
  imports: [RouterLink, AppAlert],
  templateUrl: './student-home.html',
  styleUrls: ['../../student-ui.css', './student-home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [studentContentEnter],
})
export class StudentHome {
  private readonly auth = inject(AuthApiService);
  private readonly campus = inject(StudentCampusService);

  readonly firstName = computed(() =>
    firstName(this.auth.user()?.name ?? this.auth.user()?.email ?? ''),
  );
  readonly loading = this.campus.loading;
  readonly errorMessage = this.campus.error;
  readonly courses = this.campus.courses;
  readonly nextClass = this.campus.nextClass;
  readonly todayIso = todayIso();
  readonly formatNice = formatNice;

  constructor() {
    this.campus.ensure();
  }

  meetUrl(): string | null {
    return this.nextClass()?.session?.meet_url ?? null;
  }

  retry(): void {
    this.campus.reload().subscribe();
  }
}

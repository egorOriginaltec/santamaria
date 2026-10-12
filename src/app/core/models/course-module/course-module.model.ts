export interface CourseStat {
  readonly value: string;
  readonly label: string;
}

export interface CourseHighlight {
  readonly title: string;
  readonly text: string;
}

export interface ModuleProject {
  readonly name: string;
  readonly summary: string;
  readonly startDay: number;
  readonly developmentDays: string;
  readonly hours: string;
}

export interface ModuleClass {
  readonly day: number;
  readonly classNumber: number;
  readonly title: string;
  readonly contents: readonly string[];
  readonly practice?: string;
  readonly result?: string;
  readonly isProjectStart?: boolean;
}

export interface CourseModule {
  readonly id: number;
  readonly title: string;
  readonly weeks: string;
  readonly daysRange: string;
  readonly hours: string;
  readonly projectsCount: number;
  readonly learning: string;
  readonly objective: string;
  readonly projectStartNote: string;
  readonly technologies: readonly string[];
  readonly projects: readonly ModuleProject[];
  readonly note?: string;
  readonly deliverable: string;
  readonly classes: readonly ModuleClass[];
}

export interface CourseOverviewRow {
  readonly block: string;
  readonly weeks: string;
  readonly hours: string;
  readonly projects: string;
}

export interface ProjectSummary {
  readonly phase: string;
  readonly count: number;
  readonly items: string;
}

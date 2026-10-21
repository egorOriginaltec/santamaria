import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { CourseDto } from '@core/services/courses-api.service';
import { Observable, map } from 'rxjs';

export interface CourseClassDto {
  readonly id: number;
  readonly uuid: string;
  readonly course_id: number;
  readonly course_unit_id: number;
  readonly date_label: string;
  readonly date: string;
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly text: string;
  readonly learns: string;
  readonly result: string | null;
  readonly sort_order: number;
}

export interface CourseUnitDto {
  readonly id: number;
  readonly uuid: string;
  readonly course_id: number;
  readonly phase: string;
  readonly period: string;
  readonly title: string;
  readonly text: string;
  readonly sort_order: number;
  readonly classes?: readonly CourseClassDto[];
  readonly sessions?: readonly CourseClassDto[];
}

export interface CourseUnitPayload {
  readonly phase: string;
  readonly period: string;
  readonly title: string;
  readonly text: string;
  readonly sort_order: number;
}

export interface CourseClassPayload {
  readonly date_label: string;
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly learns: string;
  readonly result: string | null;
  readonly sort_order: number;
}

interface UnitMutationResponse {
  readonly message: string;
  readonly data: { readonly unit: CourseUnitDto };
}

interface ClassMutationResponse {
  readonly message: string;
  readonly data: { readonly class: CourseClassDto };
}

interface UnitsListResponse {
  readonly data: readonly CourseUnitDto[];
}

interface PublicCourseShowResponse {
  readonly data: {
    readonly course: CourseDto;
    readonly curriculum: readonly CourseUnitDto[];
  };
}

@Injectable({ providedIn: 'root' })
export class CourseCurriculumApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/courses`;
  private readonly publicEndpoint = `${API_BASE_URL}/api/v1/public/courses`;

  listUnits(courseUuid: string): Observable<readonly CourseUnitDto[]> {
    return this.http
      .get<UnitsListResponse>(`${this.endpoint}/${courseUuid}/units`)
      .pipe(map((response) => response.data ?? []));
  }

  createUnit(courseUuid: string, payload: CourseUnitPayload): Observable<CourseUnitDto> {
    return this.http
      .post<UnitMutationResponse>(`${this.endpoint}/${courseUuid}/units`, payload)
      .pipe(map((response) => response.data.unit));
  }

  updateUnit(
    courseUuid: string,
    unitUuid: string,
    payload: Partial<CourseUnitPayload>,
  ): Observable<CourseUnitDto> {
    return this.http
      .put<UnitMutationResponse>(`${this.endpoint}/${courseUuid}/units/${unitUuid}`, payload)
      .pipe(map((response) => response.data.unit));
  }

  destroyUnit(courseUuid: string, unitUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${courseUuid}/units/${unitUuid}`);
  }

  createClass(
    courseUuid: string,
    unitUuid: string,
    payload: CourseClassPayload,
  ): Observable<CourseClassDto> {
    return this.http
      .post<ClassMutationResponse>(
        `${this.endpoint}/${courseUuid}/units/${unitUuid}/classes`,
        payload,
      )
      .pipe(map((response) => response.data.class));
  }

  updateClass(
    courseUuid: string,
    unitUuid: string,
    classUuid: string,
    payload: Partial<CourseClassPayload>,
  ): Observable<CourseClassDto> {
    return this.http
      .put<ClassMutationResponse>(
        `${this.endpoint}/${courseUuid}/units/${unitUuid}/classes/${classUuid}`,
        payload,
      )
      .pipe(map((response) => response.data.class));
  }

  destroyClass(courseUuid: string, unitUuid: string, classUuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.endpoint}/${courseUuid}/units/${unitUuid}/classes/${classUuid}`,
    );
  }

  getPublicBySlug(slug: string): Observable<{
    course: CourseDto;
    curriculum: readonly CourseUnitDto[];
  }> {
    return this.http
      .get<PublicCourseShowResponse>(`${this.publicEndpoint}/${slug}`)
      .pipe(map((response) => response.data));
  }
}

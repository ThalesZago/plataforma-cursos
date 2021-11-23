import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { iCurso } from '../interfaces/curso';
import { Response } from '../interfaces/response';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private _aCourse: BehaviorSubject<Array<iCurso>>;
  private _aCourseSize: BehaviorSubject<number>;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
    this._aCourse = new BehaviorSubject<Array<iCurso>>([]);
    this._aCourseSize = new BehaviorSubject<number>(0);
  }
  getCourse(id: number) {
    return this.httpClient
      .get<Response>(`http://localhost:8000/api/course/get?id=${id}`)
      .pipe(
        map((res) => res.data as iCurso),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  listCourses() {
    return this.httpClient.get<iCurso[]>(`http://localhost:8000/api/course`);
  }

  createCourse(course: iCurso): Observable<Response> {
    return this.httpClient
      .post<Response>(`http://localhost:8000/api/course`, course)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  editCourse(course: iCurso): Observable<Response> {
    return this.httpClient
      .put<Response>(`http://localhost:8000/api/course/${course.id}`, course)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  deleteCourse(course: iCurso): Observable<Response> {
    return this.httpClient
      .delete<Response>(`http://localhost:8000/api/course/${course.id}`)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }
  setCourse(course: Array<iCurso>): void {
    this._aCourse.next(course);
  }

  setCourseSize(size: number): void {
    this._aCourseSize.next(size);
  }

  get aCourse(): BehaviorSubject<Array<iCurso>> {
    return this._aCourse;
  }

  get aCourseSize(): BehaviorSubject<number> {
    return this._aCourseSize;
  }
}

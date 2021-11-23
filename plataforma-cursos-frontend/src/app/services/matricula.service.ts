import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { iMatricula } from '../interfaces/matricula';
import { Response } from '../interfaces/response';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  private _aEnrollment: BehaviorSubject<Array<iMatricula>>;
  private _aEnrollmentSize: BehaviorSubject<number>;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
    this._aEnrollment = new BehaviorSubject<Array<iMatricula>>([]);
    this._aEnrollmentSize = new BehaviorSubject<number>(0);
  }
  getEnrollment(id: number) {
    return this.httpClient
      .get<Response>(`http://localhost:8000/api/enrollment/get?id=${id}`)
      .pipe(
        map((res) => res.data as iMatricula),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  listEnrollments() {
    return this.httpClient.get<iMatricula[]>(
      `http://localhost:8000/api/enrollment`
    );
  }

  createEnrollment(enrollment: iMatricula): Observable<Response> {
    return this.httpClient
      .post<Response>(`http://localhost:8000/api/enrollment`, enrollment)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  editEnrollment(enrollment: iMatricula): Observable<Response> {
    return this.httpClient
      .put<Response>(
        `http://localhost:8000/api/enrollment/${enrollment.id}`,
        enrollment
      )
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  deleteEnrollment(enrollment: iMatricula): Observable<Response> {
    return this.httpClient
      .delete<Response>(`http://localhost:8000/api/enrollment/${enrollment.id}`)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }
  setEnrollment(enrollment: Array<iMatricula>): void {
    this._aEnrollment.next(enrollment);
  }

  setEnrollmentSize(size: number): void {
    this._aEnrollmentSize.next(size);
  }

  get aEnrollment(): BehaviorSubject<Array<iMatricula>> {
    return this._aEnrollment;
  }

  get aEnrollmentSize(): BehaviorSubject<number> {
    return this._aEnrollmentSize;
  }
}

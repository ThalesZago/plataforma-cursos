import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Aluno } from '../interfaces/aluno';
import { Response } from '../interfaces/response';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private _aStudent: BehaviorSubject<Array<Aluno>>;
  private _aStudentSize: BehaviorSubject<number>;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
    this._aStudent = new BehaviorSubject<Array<Aluno>>([]);
    this._aStudentSize = new BehaviorSubject<number>(0);
  }
  getStudent(id: number) {
    return this.httpClient
      .get<Response>(`http://localhost:8000/api/student/get?id=${id}`)
      .pipe(
        map((res) => res.data as Aluno),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  listStudents() {
    return this.httpClient.get<Aluno[]>(`http://localhost:8000/api/student`);
  }

  createStudent(student: Aluno): Observable<Response> {
    return this.httpClient
      .post<Response>(`http://localhost:8000/api/student`, student)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  editStudent(student: Aluno): Observable<Response> {
    return this.httpClient
      .put<Response>(`http://localhost:8000/api/student/${student.id}`, student)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  deleteStudent(student: Aluno): Observable<Response> {
    return this.httpClient
      .delete<Response>(`http://localhost:8000/api/student/${student.id}`)
      .pipe(
        tap((res) => this.errorService.handleSuccess(res)),
        catchError((err) => this.errorService.handleError(err))
      );
  }
  setStudent(student: Array<Aluno>): void {
    this._aStudent.next(student);
  }

  setStudentSize(size: number): void {
    this._aStudentSize.next(size);
  }

  get aStudent(): BehaviorSubject<Array<Aluno>> {
    return this._aStudent;
  }

  get aStudentSize(): BehaviorSubject<number> {
    return this._aStudentSize;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(protected matSnackBar: MatSnackBar) {}

  handleSuccess(res: Response): void {
    res.message || 'requisição bem sucedida', 'success';
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    err.error?.message || 'erro inesperado', 'error';

    return throwError(err);
  }
}

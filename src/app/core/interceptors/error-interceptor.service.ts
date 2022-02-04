import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap((response) => {

      }),
      catchError((error: HttpErrorResponse) => {
        const errorCode = error.error.message
        if (errorCode === 'unauthorised') {
          this.authService.logout()
        } else {
        }

        return throwError(error)
      })
    )
  }


}

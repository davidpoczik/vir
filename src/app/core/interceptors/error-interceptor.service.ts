import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('interceptor', req, next)
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        alert(error.error.message)
        return throwError(error)
      })
    )
  }
}

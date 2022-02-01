import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorCode = error.error.message
        const defaultErrorMessageTranslated = this.translateService.instant(error.statusText)

        if (errorCode === 'unauthorised') {
          this.authService.logout()
        } else {
          this.toastService.error(defaultErrorMessageTranslated)
        }

        return throwError(error)
      })
    )
  }

  constructor(private authService: AuthService, private toastService: HotToastService, private translateService: TranslateService) {
  }
}

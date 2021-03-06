import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken()

    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      })

      return next.handle(clonedReq)
    }

    return next.handle(req);
  }

  constructor(private authService: AuthService) {
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('req', req)
        return next.handle(req).pipe(
            tap(res => {
                // console.log("response? ", res)
            }),
        )
    }


}

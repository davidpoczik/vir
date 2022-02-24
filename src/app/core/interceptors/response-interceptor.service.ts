import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CreateHotToastRef, HotToastRef, HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {

    loadingToast?: CreateHotToastRef<unknown>

    constructor(
        private toastService: HotToastService,
        private translateService: TranslateService
    ) {
        // 0: "Sent"
        // 1: "UploadProgress"
        // 2: "ResponseHeader"
        // 3: "DownloadProgress"
        // 4: "Response"
        // 5: "User"
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.reportProgress) {
            this.loadingToast = this.toastService.loading(

                this.translateService.instant(
                    `alert.${req.method.toLowerCase()}.loading`
                )
            )
        }
        return next.handle(req).pipe(
            tap((res) => {
                if (res.type === HttpEventType.ResponseHeader) {
                    this.loadingToast?.updateMessage(
                        this.translateService.instant(
                            `alert.${req.method.toLowerCase()}.success`
                        )
                    )
                    this.loadingToast?.updateToast({ type: 'success', duration: 2000 })
                }
            }),
        )
    }
}

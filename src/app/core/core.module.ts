import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { ResponseInterceptorService } from './interceptors/response-interceptor.service';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule

  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true,
    }
  ]
})
export class CoreModule { }

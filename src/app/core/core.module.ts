import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { ResponseInterceptorService } from './interceptors/response-interceptor.service';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    TranslateModule.forChild()
  ],
  exports: [
    HttpClientModule,
    TranslateModule
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

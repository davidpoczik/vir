import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
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
    }
  ]
})
export class CoreModule { }

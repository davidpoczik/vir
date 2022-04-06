import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Subscription, tap } from 'rxjs';
import { Urls } from 'src/app/core/constants/url.constant';
import { EventListenerService } from 'src/app/core/services/event-listener.service';
import { CheckResponse, Storage } from 'src/app/core/services/pda.model';

const urlHelper = new Urls

@Component({
  templateUrl: './store-to-base.component.html',
  providers: [
    EventListenerService
  ]
})
export class StoreToBaseComponent implements OnInit {

  listenerSubscription?: Subscription
  barcodeSubscription?: Subscription
  checkUrl = urlHelper.pda.stackCheck
  isChecked = false
  storage?: Storage

  progress = 0

  sp?: string
  rk?: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public eventListenerService: EventListenerService,
    private toastService: HotToastService,
    private translateService: TranslateService,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {

    this.eventListenerService.watchKeyup()

    this.listenerSubscription = this.eventListenerService.eventKey
      .subscribe(response => {
        console.log('attarolas-kom-tarhely pda', response)
        this.onSwitch(response)
      })

    this.eventListenerService.watchScan()
    this.barcodeSubscription = this.eventListenerService.bardcodeSubject
      .subscribe(code => {
        console.log(code)

        if (this.progress === 1) {
          if (code.startsWith('SP')) {
            this.sp = code
            this.progressSwitcher()
          } else {
            this.toastService.error(
              this.translateService.instant('pda.bad_code')
            )
          }
        }

        if (this.progress === 0) {
          if (code.startsWith('RK')) {
            let toast = this.toastService.loading(
              this.translateService.instant('pda.loading')
            )

            this.httpClient.post<CheckResponse | any>(this.checkUrl, { barcode: code })
              .pipe(
                tap(response => {
                  return response
                }),
                catchError(error => {
                  toast.updateMessage(
                    this.translateService.instant(error.error.message)
                  )

                  toast.updateToast({ type: 'error' })

                  return error
                })
              )
              .subscribe((response: CheckResponse) => {
                this.rk = code
                this.progressSwitcher(response, toast)
                return response

              })
            //  this.onSwitch(response) 
          } else {
            this.toastService.error(
              this.translateService.instant('pda.bad_code')
            )
          }
        }

      })
  }

  progressSwitcher(response?: CheckResponse, toast?: any) {

    console.log(this.progress, this.sp, this.rk)

    if (this.progress == 0) {

      toast.updateMessage(
        this.translateService.instant('pda.' + response?.message ?? 'pda.success')
      )

      toast.updateToast({ type: 'success' })
      this.storage = response?.data.storage
      this.isChecked = true
      this.progress = 1
    } else if (this.progress === 1) {
      this.progress = 2
    }

    console.log(this.progress, this.sp, this.rk)
  }


  onSwitch(value: number | string) {

    switch (value) {
      case "0":

        this.router.navigate(['../'], { relativeTo: this.route });
        break;
      case "Enter":
        if (this.progress === 2) {
          let toaster = this.toastService.loading(
            this.translateService.instant('pda.saving')
          )

          console.log('retne')
          if (this.sp && this.rk) {
            this.httpClient.post(urlHelper.pda.storeToCommission, {
              tarhely: this.sp,
              rakat: this.rk
            }).pipe(
              tap(response => {
                return response
              }),
              catchError(error => {
                toaster.updateMessage(
                  this.translateService.instant(error.error.message)
                )

                toaster.updateToast({ type: 'error' })

                return error
              })
            )
              .subscribe((response: any) => {

                toaster.updateMessage(
                  this.translateService.instant('pda.' + response?.message ?? 'pda.success')
                )

                toaster.updateToast({ type: 'success' })
              })
          }
        }

        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.listenerSubscription?.unsubscribe()

    this.eventListenerService.removeWatchScan()
    this.eventListenerService.removeWatchKeyup()
  }
}


  // 1. rk 
  // 2. sp
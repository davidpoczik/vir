import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Subscription, tap } from 'rxjs';
import { Urls } from 'src/app/core/constants/url.constant';
import { CheckResponse, Storage } from 'src/app/core/services/pda.model';
import { EventListenerService } from '../../../core/services/event-listener.service';

const urlHelper = new Urls

@Component({
  templateUrl: './barcode-checker.component.html',
  providers: [
    EventListenerService
  ]
})
export class BarcodeCheckerComponent implements OnInit {

  listenerSubscription?: Subscription
  barcodeSubscription?: Subscription
  checkUrl = urlHelper.pda.barcodeChecker
  isChecked = false
  storages?: Storage[]
  product?: Storage
  amount?: Number


  constructor(
    public eventListenerService: EventListenerService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastService: HotToastService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {

    this.eventListenerService.watchScan()

    this.eventListenerService.watchKeyup()

    this.listenerSubscription = this.eventListenerService.eventKey
      .subscribe(response => {
        this.onSwitch(response)
      })

    this.barcodeSubscription = this.eventListenerService.bardcodeSubject
      .subscribe(code => {
        let toast = this.toastService.loading(
          this.translateService.instant('pda.loading')
        )

        this.httpClient.post<CheckResponse | any>(this.checkUrl, { termekkod: code })
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
            //     console.log(response)
            toast.updateMessage(
              this.translateService.instant('pda.' + response.message ?? 'pda.success')
            )

            toast.updateToast({ type: 'success' })
            this.storages = response.data.storage_data
            this.product = response.data.product
            this.amount = response.data.amount
            this.isChecked = true
            return response
          })
        //  this.onSwitch(response)
      })

  }

  onSwitch(value: number | string) {
    //   console.log('isscanning', this.eventListenerService.isScanning)
    switch (value) {
      case "0":
        this.router.navigate(['../'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.listenerSubscription?.unsubscribe()
    this.barcodeSubscription?.unsubscribe()
  }
}
// CK
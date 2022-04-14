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
  selector: 'gastroprof-inventory-pairing',
  templateUrl: './inventory-pairing.component.html',
  providers: [
    EventListenerService
  ]
})
export class InventoryPairingComponent implements OnInit {

  storage?: Storage

  isChecked = false
  listenerSubscription?: Subscription
  barcodeSubscription?: Subscription
  checkUrl = urlHelper.pda.pairingChecker
  pairingLogUrl = urlHelper.pda.pairingLog

  scannedCode?: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public eventListenerService: EventListenerService,
    private translateService: TranslateService,
    private httpClient: HttpClient,
    private toastService: HotToastService
  ) {

  }

  ngOnInit(): void {

    this.eventListenerService.watchScan()

    this.eventListenerService.watchKeyup()

    this.listenerSubscription = this.eventListenerService.eventKey
      .subscribe(response => {
        console.log('pdacheck', response)
        this.onSwitch(response)
      })

    this.barcodeSubscription = this.eventListenerService.bardcodeSubject
      .subscribe(code => {
        this.scannedCode = code
        let toast = this.toastService.loading(
          this.translateService.instant('pda.loading')
        )

        this.httpClient.post<CheckResponse | any>(this.checkUrl, { tarhelykod: code })
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
            console.log(response)
            toast.updateMessage(
              this.translateService.instant('pda.' + response.message ?? 'pda.success')
            )

            toast.updateToast({ type: 'success' })
            this.storage = response.data.storage
            console.log(this.storage)
            this.isChecked = true
            return response
          })
        //  this.onSwitch(response)
      })

  }

  logPairing(toast: any) {
    this.httpClient.post<CheckResponse | any>(this.pairingLogUrl, { tarhelykod: this.scannedCode }).subscribe(response => {
      console.log(response)

      toast.updateMessage(
        this.translateService.instant('pda.' + response.message ?? 'pda.success')
      )
      toast.updateToast({ type: 'success' })
    })
  }

  onSwitch(value: number | string) {
    switch (+value) {
      case
        7:
        let toast = this.toastService.loading(
          this.translateService.instant('pda.logging')
        )
        this.logPairing(toast)



        this.router.navigate(['../'], { relativeTo: this.route })

        break;
      case 8:
        this.router.navigate(['../attarolas-altalanos-tarhely'], { relativeTo: this.route })
        break;
      case 9:
        this.toastService.error(
          this.translateService.instant('pda.storage_error')
        )
        this.storage = undefined
        this.isChecked = false
        break;
      case 0:
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

// SP
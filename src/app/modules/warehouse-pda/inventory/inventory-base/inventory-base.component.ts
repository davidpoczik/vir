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
  selector: 'gastroprof-inventory-base',
  templateUrl: './inventory-base.component.html',
  providers: [
    EventListenerService
  ]
})
export class InventoryBaseComponent implements OnInit {


  storage?: Storage

  isChecked = false
  listenerSubscription?: Subscription
  barcodeSubscription?: Subscription
  checkUrl = urlHelper.pda.inventorialChecker

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

  onSwitch(value: number | string) {
    switch (+value) {
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

// rk
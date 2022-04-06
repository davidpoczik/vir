import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventListenerService } from 'src/app/core/services/event-listener.service';

@Component({
  templateUrl: './pda-transfer-switcher.component.html',
  providers: [
    EventListenerService
  ]
})
export class PdaTransferSwitcherComponent implements OnInit {

  listenerSubscription?: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public eventListenerService: EventListenerService
  ) {

  }

  ngOnInit(): void {
    this.eventListenerService.watchKeyup()
    this.listenerSubscription = this.eventListenerService.eventKey
      .subscribe(response => {
        console.log('warehouse pda', response)
        this.onSwitch(response)
      })
  }

  onSwitch(value: number | string) {
    switch (+value) {
      case 1:
        this.router.navigate(['../attarolas-altalanos-tarhely'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['../attarolas-kom-tarhely'], { relativeTo: this.route });
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

    this.eventListenerService.removeWatchScan()
    this.eventListenerService.removeWatchKeyup()

  }
}
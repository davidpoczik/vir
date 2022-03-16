import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventListenerService } from '../shared/event-listener.service';

@Component({
  templateUrl: './pda-check.component.html'
})
export class PdaCheckComponent implements OnInit, OnDestroy {

  listenerSubscription?: Subscription

  constructor(
    public eventListenerService: EventListenerService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.eventListenerService.watchKeyup()
    this.listenerSubscription = this.eventListenerService.eventKey
      .subscribe(response => {
        console.log('pdacheck', response)
        this.onSwitch(response)
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
  }
}

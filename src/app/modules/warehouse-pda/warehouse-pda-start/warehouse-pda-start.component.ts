import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventListenerService } from 'src/app/core/services/event-listener.service';

@Component({
  templateUrl: './warehouse-pda-start.component.html',
  providers: [
    EventListenerService
  ]
})
export class PdaStartComponent implements OnInit, OnDestroy {

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
        console.log('warehouse pda', +response)
        this.onSwitch(response)
      })
  }

  onSwitch(value: number | string) {

    switch (+value) {
      case 1:
        this.router.navigate(['./ellenorzes'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['./attarolas-muv-valaszto'], { relativeTo: this.route });
        break;
      case 3:
        this.router.navigate(['./tars-adat-ellenorzes'], { relativeTo: this.route });
        break;
      case 4:
        this.router.navigate(['./betolt-igeny'], { relativeTo: this.route });
        break;
      case 5:
        this.router.navigate(['./vonalkod-ellenorzes'], { relativeTo: this.route });
        break;
      case 6:
        this.router.navigate(['./leltar-muv'], { relativeTo: this.route });
        break;
      case 7:
        this.router.navigate(['./tarhely-ellenorzes-munkatars'], { relativeTo: this.route });
        break;
      case 0:
        this.router.navigate(['/auth/logout']);
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
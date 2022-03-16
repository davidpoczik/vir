import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class EventListenerService {
    eventKey = new Subject<any>();
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    watchKeyup() {
        const key = this.eventKey
        this.document.addEventListener('keypress', function (event) {
            key.next(event.key)
        })

    }




}
import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
@Injectable()
export class EventListenerService implements OnDestroy {
    eventKey = new Subject<any>();
    bardcodeSubject = new Subject<any>();
    isScanningSubject = new BehaviorSubject<boolean>(false);
    isScanning = this.isScanningSubject.value
    keyUnlistener?: () => void;
    scanUnlistener?: () => void;

    private renderer2: Renderer2;
    constructor(
        rendererFactor: RendererFactory2
    ) {
        this.isScanningSubject.next(false)
        this.renderer2 = rendererFactor.createRenderer(null, null)

        this.isScanningSubject.subscribe(response => {
            //    this.isScanning = response
        })
    }

    watchKeyup() {
        const key = this.eventKey
        let serviceThis = this

        this.keyUnlistener = this.renderer2.listen("document", "keyup", function (evt) {
            setTimeout(() => {
                if (!serviceThis.isScanning) {
                    key.next(evt.key)
                }
            }, 30);

        }).bind(this)
    }

    watchScan(intervalArgument?: any) {
        let barcodeSubject = this.bardcodeSubject
        let barcodeValue = ''
        let interval = intervalArgument
        let serviceThis = this
        this.scanUnlistener = this.renderer2.listen("document", "keyup", function (evt) {

            if (interval) {


                clearInterval(interval)

            }
            if (evt.code == 'Enter') {
                if (barcodeValue) {
                    barcodeSubject.next(barcodeValue)
                    setTimeout(() => {
                        serviceThis.isScanning = false
                        serviceThis.isScanningSubject.next(false);
                    }, 500)
                    barcodeValue = ''
                    return false
                }
                return false
            }
            if (evt.key !== 'Shift') {
                barcodeValue += evt.key
                if (barcodeValue.length > 1) {
                    serviceThis.isScanning = true
                    serviceThis.isScanningSubject.next(true);
                }
            }
            interval = setInterval(() => {
                if (serviceThis.isScanning) {
                    serviceThis.isScanning = false
                    serviceThis.isScanningSubject.next(false);
                }
                barcodeValue = '';

            }, 50)
            return
        })

    }

    removeWatchScan() {
        if (this.scanUnlistener) {
            //     console.log('scanUnlistener closed')
            this.scanUnlistener()
        }
    }

    removeWatchKeyup() {
        if (this.keyUnlistener) {
            //      console.log('keyuplistener closed')
            this.keyUnlistener()
        }
    }

    ngOnDestroy(): void {
        //    console.log('service destroyed')

        this.removeWatchKeyup()
        this.removeWatchScan()

    }
} 
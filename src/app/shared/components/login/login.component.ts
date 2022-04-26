import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'gastroprof-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword = false
  showEyes = true
  submitted = false
  loginForm: FormGroup
  bc?: string

  barcodeSubscription?: Subscription
  passwordSubscription?: Subscription

  barcode = new BehaviorSubject<string>('')

  interval?: any

  private unlistener?: () => void;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router,
    private renderer2: Renderer2
  ) {

    this.loginForm = new FormGroup({
      username: new FormControl('simonz'),
      password: new FormControl('z4r4k1k3np4ch1')
    })

    this.barcodeWatching()
  }

  ngOnInit(): void {
    this.passwordValueWatching()
    this.barcodeValueWatching()
  }

  onShowPassword() {
    this.showPassword = !this.showPassword
  }

  onSubmit(form: FormGroup) {
    this.submitted = true
    this.sendKeyboardLogin(form)
  }

  passwordValueWatching() {
    this.passwordSubscription = this.loginForm.controls['password'].valueChanges.subscribe((response) => {
      this.showEyes = response.length > 0
    })
  }

  barcodeValueWatching() {
    this.barcode.subscribe(valueResponse => {
      if (valueResponse && valueResponse.length > 0) {
        this.bc = valueResponse
        this.sendBarcodeLogin(valueResponse)
      }
    })
  }

  sendKeyboardLogin(form: FormGroup) {
    this.authService.login(form.value)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/vezerlopult'])
        } else {
          this.submitted = false
        }
      }, error => {
        this.submitted = false
      })
  }

  sendBarcodeLogin(barcodeValue: string) {

    this.authService.login({ barcode: barcodeValue })
      .subscribe((response) => {
        if (response.success) {
          this.authService.setPdaUser(true)

          this.router.navigate(['/raktar-pda'])
        } else {
          this.submitted = false
        }
      }, error => {
        this.submitted = false
      })
  }

  barcodeWatching() {
    let barcodeSubject = this.barcode
    let barcodeValue = ''
    let interval = this.interval
    const insideThis = this

    this.unlistener = this.renderer2.listen("document", "keyup", function (evt) {

      if (!insideThis.submitted) {
        if (interval) {
          clearInterval(interval)
        }

        if (evt.key == 'Enter') {

          if (barcodeValue) {
            barcodeSubject.next(barcodeValue)
            insideThis.bc = barcodeValue
            barcodeValue = ''
            clearInterval(interval)
            console.log('cleared interval')
            return false
          }
          return false
        }
        if (evt.key !== 'Shift' && evt.keyCode !== 0) {
          barcodeValue += evt.key
          insideThis.bc = barcodeValue
        }
        interval = setInterval(() => { console.log('set', barcodeValue); barcodeValue = '' }, 50)
        console.log('init interval')

        return
      }
      return
    })

  }

  ngOnDestroy(): void {
    this.barcodeSubscription?.unsubscribe()
    this.passwordSubscription?.unsubscribe()
    if (this.unlistener) {
      this.unlistener()
    }
  }

}
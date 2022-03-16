import { Component, Inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'gastroprof-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword = false
  showEyes = true
  submitted = false
  loginForm: FormGroup

  barcodeSubscription?: Subscription
  passwordSubscription?: Subscription

  barcode = new BehaviorSubject<string>('')

  interval?: any


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router
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
      if (valueResponse && valueResponse.length > 0)
        this.sendBarcodeLogin(valueResponse)
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

    if (!this.submitted) {
      document.addEventListener('keyup', function (evt) {

        if (interval) {
          clearInterval(interval)
        }
        if (evt.code == 'Enter') {
          if (barcodeValue) {

            barcodeSubject.next(barcodeValue)
            barcodeValue = ''
            return false
          }
          return false
        }
        if (evt.key !== 'Shift') {

          barcodeValue += evt.key
        }
        interval = setInterval(() => { console.log('set', barcodeValue); barcodeValue = '' }, 50)
        return
      })
    }
  }

  ngOnDestroy(): void {
    this.barcodeSubscription?.unsubscribe()
    this.passwordSubscription?.unsubscribe()

  }

}
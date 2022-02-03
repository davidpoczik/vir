import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'vir-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  showPassword = false
  showEyes = true
  submitted = false

  loginForm: FormGroup

  onSubmit(form: FormGroup) {
    this.submitted = true

    this.AuthService.login(form.value).pipe(
      this.toastService.observe({
        loading: 'Egy pillanat...',
        success: 'success',
        error: 'error'
      })
    )
      .subscribe((response) => {
        console.log(response)
        if (response.success) {
          this.router.navigate(['/modules'])
        } else {
          this.submitted = false
        }
      }, error => {
        this.submitted = false
      })
  }

  onShowPassword() {
    this.showPassword = !this.showPassword
  }

  ngOnInit(): void {
    this.loginForm.controls['password'].valueChanges.subscribe((r) => {
      console.log(r)
      this.showEyes = r.length > 0
    })
  }

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private toastService: HotToastService) {

    this.loginForm = new FormGroup({
      username: new FormControl('simonz'),
      password: new FormControl('z4r4k1k3np4ch1')
    })

  }
}

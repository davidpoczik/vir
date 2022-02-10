import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'gastroprof-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showPassword = false
  showEyes = true
  submitted = false

  loginForm: FormGroup

  constructor(
    private AuthService: AuthService,
    private router: Router) {

    this.loginForm = new FormGroup({
      username: new FormControl('simonz'),
      password: new FormControl('z4r4k1k3np4ch1')
    })
  }

  onSubmit(form: FormGroup) {
    this.submitted = true
    this.AuthService.login(form.value)
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

  onShowPassword() {
    this.showPassword = !this.showPassword
  }

  ngOnInit(): void {
    this.loginForm.controls['password'].valueChanges.subscribe((response) => {
      console.log(response)
      this.showEyes = response.length > 0
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'vir-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  inputUsername = "simonz"
  inputPassword = "z4r4k1k3np4ch1"

  onSubmit() {
    this.AuthService.login({
      username: this.inputUsername,
      password: this.inputPassword
    }).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['modules'])
      }
    })
  }

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
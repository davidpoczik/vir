import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
    }).pipe(
      this.toastService.observe({
        loading: 'Egy pillanat...',
        success: 'success',
        error: 'error'
      })
    ).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void { }

  constructor(private AuthService: AuthService, private router: Router, private toastService: HotToastService) { }
}

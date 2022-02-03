import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { loginApiPostData, loginApiResponseData } from "src/app/core/models/login.model";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginApiUrl = environment.api.base + environment.api.login

  constructor(
    private httpClient: HttpClient
  ) {
  }

  setUserData(user: User) {
    localStorage.setItem('vir_fullname', user.fullname)
    localStorage.setItem('vir_position', user.position)
    localStorage.setItem('vir_token', user.token)
  }

  getToken() {
    return localStorage.getItem('vir_token')
  }

  login(userData: loginApiPostData) {
    return this.httpClient
      .post<loginApiResponseData>(this.loginApiUrl, userData)
      .pipe(
        take(1),
        tap(response => {
          if (response.success) {
            this.setUserData(response.data)
          }
        })
      )
  }

  logout() {
    localStorage.removeItem('vir_fullname')
    localStorage.removeItem('vir_position')
    localStorage.removeItem('vir_token')
  }

  isLoggedIn() {
    return !!localStorage.getItem('vir_token')
  }

  static isLoggedIn() {
    return !!localStorage.getItem('vir_token')
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, take, tap } from "rxjs";
import { loginApiPostData, loginApiResponseData } from "src/app/core/models/login.model";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginApiUrl = environment.api.base + environment.api.login

  loginAlertLoading = 'login.alert.loading'
  loginAlertSuccess = 'login.alert.success'
  loginAlertError = 'login.alert.error'

  loginAlertLogou = 'login.alert.logout'

  userData?: BehaviorSubject<User>

  constructor(
    private httpClient: HttpClient,
    private toastService: HotToastService,
    private translateService: TranslateService
  ) {
    const user = this.getUserData()
    this.userData = new BehaviorSubject<User>(user)
  }

  setUserData(user: User) {
    localStorage.setItem('vir_fullname', user.fullname)
    localStorage.setItem('vir_position', user.position)
    localStorage.setItem('vir_token', user.token)

    this.userData?.next({
      fullname: user.fullname,
      position: user.position,
      token: user.token
    })
  }
  getUserData<User>() {
    const returnableUser = {
      fullname: localStorage.getItem('vir_fullname') ?? '',
      position: localStorage.getItem('vir_position') ?? '',
      token: localStorage.getItem('vir_token') ?? ''
    }
    return returnableUser
  }

  getToken() {
    return localStorage.getItem('vir_token')
  }

  login(userData: loginApiPostData) {
    return this.httpClient
      .post<loginApiResponseData>(this.loginApiUrl, userData)
      .pipe(
        this.toastService.observe(
          {
            loading: this.translateService.instant(this.loginAlertLoading),
            success: this.translateService.instant(this.loginAlertSuccess),
            error: this.translateService.instant(this.loginAlertError),
          }
        ),
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

    this.userData?.closed
    this.toastService.warning(
      this.translateService.instant(this.loginAlertLogou)
    )
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

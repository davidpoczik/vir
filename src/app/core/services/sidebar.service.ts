import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { SidebarApiResponseData } from "../models/sidebar.model";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private apiUrlForGetViews = environment.api.base + environment.api.views

  isOpen = new BehaviorSubject(false)

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) { }

  getViews() {
    return this.httpClient
      .get<SidebarApiResponseData>(this.apiUrlForGetViews)
      .pipe(
        take(1),
        tap((response) => {
          return this.convertResponseMenuToArray({ ...response })
        })
      )
  }

  toggleSidebar() {
    let newValue
    this.isOpen.next(
      newValue = !this.isOpen.getValue()
    )
    return newValue
  }

  convertResponseMenuToArray(response: SidebarApiResponseData) {
    if (!Array.isArray(response?.data)) {
      response.data = Object.values(response.data)

      response.data = { ...response.data }
      return response
    }

    return response

  }
}

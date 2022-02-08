import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
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
        tap((response) => {
          return this.convertResponseMenuToArray({ ...response })
        })
      )
  }

  toggleSidebar() {
    this.isOpen.next(
      !this.isOpen.getValue()
    )
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

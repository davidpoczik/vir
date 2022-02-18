import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, take, tap } from "rxjs";
import { Urls } from "../constants/url.constant";
import { SidebarApiResponseData } from "../models/sidebar.model";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  urlHelper = new Urls
  private apiUrlForGetViews = this.urlHelper.api.views

  isOpen = new BehaviorSubject(false)
  sidebarViews = new BehaviorSubject<SidebarApiResponseData | null>(null)

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
      ).subscribe(response => {
        this.sidebarViews.next(response)
      })
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

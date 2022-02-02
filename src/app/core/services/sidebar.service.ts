import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, share, shareReplay, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { SidebarApiResponseData } from "../models/sidebar.model";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private apiUrlForGetModules = environment.api.base + environment.api.modules
  private apiUrlForGetViews = environment.api.base + environment.api.views


  getSidebarModules() {
    return this.httpClient
      .get<SidebarApiResponseData>(this.apiUrlForGetModules)
      .pipe(
        shareReplay(),
        tap((response) => {
          console.log(response)
          return this.convertResponseMenuToArray({ ...response })
        })
      )
  }

  getSidebarViews(id: number) {
    return this.httpClient
      .get<SidebarApiResponseData>(`${this.apiUrlForGetViews}?id=${id}`)
      .pipe(
        shareReplay(),
        tap((response) => {
          return this.convertResponseMenuToArray({ ...response })
        })
      )
  }

  convertResponseMenuToArray(response: SidebarApiResponseData) {
    if (!Array.isArray(response.data?.menu)) {
      response.data.menu = Object.values(response.data.menu)
    }
    response.data.menu = { ...response.data.menu }
    return response
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }

}

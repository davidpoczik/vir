import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { SidebarApiResponseData } from "../models/sidebar.model";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  getSidebar(id?: number) {
    console.log(id)
    let apiUrl = (!id)
      ?
      environment.api.base + environment.api.modules
      :
      environment.api.base + environment.api.views

    if (id) {
      apiUrl += '?id=' + id
    }
    return this.httpClient
      .get<SidebarApiResponseData>(apiUrl)
      .pipe(
        tap((response) => {
          let responseClone = { ...response }

          if (!Array.isArray(response.data?.menu)) {
            responseClone.data.menu = Object.values(response.data.menu)
          }
          responseClone.data.menu = { ...responseClone.data.menu }
          console.log(response)
          return responseClone
        })
      )
  }



  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {

  }

}

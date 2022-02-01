import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sidebar: BehaviorSubject<any>



  getSidebar<SidebarApiResponseData>(id?: number) {

    let apiUrl = (id)
      ?
      environment.api.base + environment.api.modules
      :
      environment.api.base + environment.api.views
    if (id) {
      apiUrl += '?id=' + id
    }

    return this.httpClient.get(apiUrl)
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.sidebar = new BehaviorSubject([])

  }

}

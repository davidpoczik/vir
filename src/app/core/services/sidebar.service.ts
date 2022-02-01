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

  setHeadersForSidebar<HttpHeaders>(id: number) {
    let header = new HttpHeaders()

    if (id) {
      header = header.append('id', id?.toString())
    }
    return header
  }

  getSidebar<SidebarApiResponseData>(data: {} | any, params: any) {
    // const headerWithID = this.setHeadersForSidebar(params.id)
    let apiUrl = (data?.root)
      ?
      environment.api.base + environment.api.modules
      :
      environment.api.base + environment.api.views
    if (params?.id) {
      apiUrl += '?id=' + params?.id
    }

    return this.httpClient.get(apiUrl)
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.sidebar = new BehaviorSubject([])

  }

}

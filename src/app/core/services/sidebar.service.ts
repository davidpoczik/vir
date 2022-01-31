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
      header = header.append('modul_id', id?.toString())
    }

    return header
  }

  getSidebar(data: {} | any, params: any) {

    const headerWithID = this.setHeadersForSidebar(params.id)

    let apiUrl = (data?.root) ? environment.api.base + environment.api.modules : environment.api.base + environment.api.views


    return this.httpClient.get(apiUrl, { headers: headerWithID })
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.sidebar = new BehaviorSubject([])
  }

}

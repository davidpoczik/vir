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


  getSidebar(data: {} | any, params: any) {

    let headers: HttpHeaders

    let apiUrl = (data?.root) ? environment.api.base + environment.api.modules : environment.api.base + environment.api.views

    if (params.id) {
      headers = new HttpHeaders({ 'modul_id': params.id?.toString() })
    } else {
      headers = new HttpHeaders()
    }
    return this.httpClient.get(apiUrl, { headers: headers })
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.sidebar = new BehaviorSubject([])
  }

}

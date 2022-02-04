import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleApiResponseData } from '../shared/modules.model';

@Component({
  templateUrl: './administration-modules.component.html',
})
export class AdministrationModulesComponent implements OnInit {

  private apiGetUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.modules.get}`

  modules$: Observable<any>

  constructor(
    private httpClient: HttpClient
  ) {
    this.modules$ = of(null)
  }

  ngOnInit(): void {
    this.getAdminModulesData()
  }

  getAdminModulesData() {
    this.httpClient.get<ModuleApiResponseData>(`${this.apiGetUrl}`)
      .pipe(
        tap(response => {
          response.data = Object.values(response.data)
          return response
        })
      )
      .subscribe(response => {
        this.modules$ = of(response.data)
      })
  }

}

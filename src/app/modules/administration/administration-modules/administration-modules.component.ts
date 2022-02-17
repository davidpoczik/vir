import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginationResponse } from 'src/app/core/models/response.model';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { environment } from 'src/environments/environment';
import { ViewApiResponseData } from '../shared/modules.model';

@Component({
  templateUrl: './administration-modules.component.html',
})
export class AdministrationModulesComponent implements OnInit {

  private apiGetUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.view.get}`

  views$: Observable<any>

  constructor(
    private httpClient: HttpClient,
    public paginationService: PaginationService
  ) {
    this.views$ = of(null)
  }

  ngOnInit(): void {
    this.paginationService.paginationState.subscribe(paginationResponse => {
      this.getAdminModulesData(
        paginationResponse
      )
    })
  }

  getAdminModulesData(paginationState: PaginationResponse, search?: string) {
    let apiUrl = `${this.apiGetUrl}?page=${paginationState.page}&limit=${paginationState.limit}`
    if (search) {
      apiUrl += `&search=${search}`
    }
    this.httpClient.get<ViewApiResponseData>(apiUrl)
      .subscribe(response => {
        this.paginationService.count.next(response.data.count)
        this.views$ = of(response.data.views)
      })
  }

  onViewSearch(event: Event) {
    event.stopPropagation()
    const searchValue = (event.target as HTMLInputElement).value
    console.log(searchValue)
    if (searchValue.length >= 3) {
      this.getAdminModulesData(
        this.paginationService.paginationState.getValue(),
        searchValue
      )
    } else if (searchValue.length === 0) {
      this.paginationService.paginationState.getValue()
    }
  }

} 

import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { PaginationResponse } from "src/app/core/models/response.model";
import { PaginationService } from "src/app/core/services/pagination.service";
import { ViewApiResponseData } from "../../../../core/models/modules.model";

@Component({
    selector: "gastroprof-dashboard-list",
    templateUrl: './dashboard-list.component.html',
})
export class DashboardListComponent {

    apiGetUrl = this.route.snapshot.data['getUrl']
    idParameter = this.route.snapshot.data['id']
    hasNewButton = this.route.snapshot.data['newButton']

    views$: Observable<any>
    searchChanged = false

    constructor(
        private httpClient: HttpClient,
        public paginationService: PaginationService,
        private route: ActivatedRoute
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

    getAdminModulesData(paginationState: PaginationResponse) {
        let apiUrl = `${this.apiGetUrl}?page=${paginationState.page}&limit=${paginationState.limit}`
        if (paginationState.search) {
            apiUrl += `&search=${paginationState.search}`
        }
        this.httpClient.get<ViewApiResponseData>(apiUrl)
            .subscribe(response => {
                const elementKey = Object.keys(response.data)[0]

                if (Object.keys(response.data).includes(elementKey)) {
                    this.views$ = of(response.data[elementKey])
                }
                this.paginationService.count.next(+response.data?.count)
            })
    }

    onViewSearch(event: Event) {
        event.stopPropagation()
        const searchValue = (event.target as HTMLInputElement).value

        if (searchValue.length >= 3) {
            this.searchChanged = true

            this.paginationService.setPage(1)
            this.paginationService.updateSearch(searchValue)

            this.getAdminModulesData(
                this.paginationService.paginationState.getValue()
            )

        } else if (searchValue.length === 0) {
            if (this.searchChanged) {
                this.paginationService.setPage(1)
                this.paginationService.updateSearch(undefined)

                this.getAdminModulesData(
                    this.paginationService.paginationState.getValue()
                )
                this.searchChanged = false
            }
        }
    }

} 
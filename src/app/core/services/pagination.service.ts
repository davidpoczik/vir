import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    paginationState = new BehaviorSubject<{ page: number, limit: number, search?: string }>({ page: 1, limit: 1 })
    count = new BehaviorSubject<number>(0)

    get page() { return this.paginationState.getValue().page }
    get limit() { return this.paginationState.getValue().limit }

    constructor() { }

    increasePage() {
        const currentPaginationState = this.paginationState.getValue()
        const newPaginationValue = currentPaginationState.page + 1
        if (newPaginationValue <= this.count.getValue()) {
            const nextPaginationState = Object.assign(currentPaginationState, { page: newPaginationValue })
            this.paginationState.next(nextPaginationState)
        }
    }

    decreasePage() {
        const currentPaginationState = this.paginationState.getValue()
        if (currentPaginationState.page > 1) {
            const newPaginationValue = currentPaginationState.page - 1
            const nextPaginationState = Object.assign(currentPaginationState, { page: newPaginationValue })
            this.paginationState.next(nextPaginationState)
        }
    }

    setPage(value: number) {
        const currentPaginationState = this.paginationState.getValue()
        const nextPaginationState = Object.assign(currentPaginationState, { page: +value })
        this.paginationState.next(nextPaginationState)
    }

    changeLimit(event: Event) {
        const newLimitValue = (event.target as HTMLInputElement).value
        const currentPaginationState = this.paginationState.getValue()
        const nextPaginationState = Object.assign(currentPaginationState, { limit: +newLimitValue, page: 1 })
        this.paginationState.next(nextPaginationState)
    }

    updateSearch(searchValue?: string) {
        const currentPaginationState = this.paginationState.getValue()
        const nextPaginationState = Object.assign(currentPaginationState, { search: searchValue })
        this.paginationState.next(nextPaginationState)
    }

}
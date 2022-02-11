import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SidebarMenuItem } from "../models/sidebar.model";
import { SidebarService } from "./sidebar.service";


@Injectable({
    providedIn: 'root'
})
export class SearchService implements OnInit {

    foundedSidebarElements = new BehaviorSubject<SidebarMenuItem[]>([])

    constructor(
        private sidebarService: SidebarService
    ) { }

    ngOnInit(): void {
    }

    getViews() {
        return this.sidebarService.sidebarViews
    }

    searchInSidebar(sidebarViews: SidebarMenuItem[], sidebarSearchText: string) {
        const searchText = sidebarSearchText.toLowerCase()
        const normalizedSearchText = searchText.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (searchText.length >= 3) {

            const foundedSidebarElements = sidebarViews?.filter((element: SidebarMenuItem) => {
                const name = element.nev.toLocaleLowerCase()
                const normalizedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                return normalizedName.includes(normalizedSearchText)
            })

            if (foundedSidebarElements.length > 0) {
                this.foundedSidebarElements.next(foundedSidebarElements)
            }
        } else {
            this.foundedSidebarElements.next([])
        }
    }
}
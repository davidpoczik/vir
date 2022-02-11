import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SidebarMenuItem } from 'src/app/core/models/sidebar.model';
import { SearchService } from 'src/app/core/services/search.service';


@Component({
  selector: 'gastroprof-search-result',
  templateUrl: './search-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarResultComponent implements OnInit {

  searchResultElements?: SidebarMenuItem[]
  @Output() isSearchClosed = new EventEmitter<any>()

  constructor(
    private ref: ChangeDetectorRef,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchService.foundedSidebarElements.subscribe(response => {
      this.searchResultElements = response
      this.ref.markForCheck()
    })
  }
  onNavigationClicked() {
    this.searchService.foundedSidebarElements.next([])
    this.isSearchClosed.emit(false)
  }

}

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarMenuItem } from 'src/app/core/models/sidebar.model';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'gastroprof-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  sidebarSearchText: string = ''
  sidebarViews?: SidebarMenuItem[]

  sidebarViewSubscription?: Subscription

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    // get all view from sidebar
    this.sidebarViewSubscription = this.getViewsSubscription()


  }

  ngOnDestroy(): void {
    this.sidebarViewSubscription?.unsubscribe()
  }

  onTyping(event: Event) {
    if (this.sidebarViews) {
      this.searchService.searchInSidebar(this.sidebarViews, this.sidebarSearchText)
    }
  }

  getViewsSubscription() {
    return this.searchService.getViews().subscribe((sidebarResponse) => {
      this.sidebarViews = sidebarResponse?.data
    })
  }



}

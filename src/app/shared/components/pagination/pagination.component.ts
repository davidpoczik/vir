import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'gastroprof-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  pages?: number[]
  count?: number
  currentPage: number = 1

  constructor(
    public paginationService: PaginationService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.paginationService.paginationState.subscribe(response => {
      this.currentPage = this.paginationService.page
      this.ref.markForCheck()
    })

    this.paginationService.count.subscribe(response => {
      this.count = response
      const paginationNumber = Math.round(this.count / this.paginationService.limit)
      this.pages = Array.from(Array(paginationNumber).keys())
      this.ref.markForCheck()
    })
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gastroprof-unmeasured-items',
  templateUrl: './unmeasured-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnmeasuredItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

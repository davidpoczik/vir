import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gastroprof-tour-selector',
  templateUrl: './tour-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

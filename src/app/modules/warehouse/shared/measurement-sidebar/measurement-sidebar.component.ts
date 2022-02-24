import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gastroprof-measurement-sidebar',
  templateUrl: './measurement-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

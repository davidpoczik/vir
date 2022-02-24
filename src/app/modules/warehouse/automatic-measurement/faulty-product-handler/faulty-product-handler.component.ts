import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gastroprof-faulty-product-handler',
  templateUrl: './faulty-product-handler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaultyProductHandlerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

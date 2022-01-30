import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

}

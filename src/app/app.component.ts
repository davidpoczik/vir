import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  navigator = navigator
  viewport = visualViewport
  constructor(
    public translate: TranslateService
  ) {

    translate.addLangs(['hu']);
    translate.setDefaultLang('hu');



  }
  ngOnInit(): void {

  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public translate: TranslateService, private route: ActivatedRoute, private router: Router) {
    translate.addLangs(['hu']);
    translate.setDefaultLang('hu');
  }
  ngOnInit(): void {


  }
}

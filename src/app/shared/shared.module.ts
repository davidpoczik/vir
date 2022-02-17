import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { DropdownDirective } from './directives/dropdown.directive';
import { SearchComponent } from './components/search/search.component';
import { SidebarResultComponent } from './components/sidebar-result/search-result.component';
import { PaginationComponent } from './components/pagination/pagination.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({

  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    DropdownDirective,
    SearchComponent,
    SidebarResultComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HotToastModule.forRoot({}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    SidebarComponent,
    HotToastModule,
    RouterModule,
    DropdownDirective,
    SearchComponent,
    SidebarResultComponent,
    PaginationComponent
  ],
})


export class SharedModule { }

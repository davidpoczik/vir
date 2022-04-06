import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { DropdownDirective } from './directives/dropdown.directive';
import { SearchComponent } from './components/search/search.component';
import { SidebarResultComponent } from './components/sidebar-result/search-result.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';



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
    TranslateModule,
    HotToastModule.forRoot({
      theme: 'snackbar',
      duration: 1000
    }),

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HotToastModule,
    RouterModule,
    DropdownDirective,
    SearchComponent,
    SidebarResultComponent,
    PaginationComponent,
    TranslateModule
  ],
})


export class SharedModule { }

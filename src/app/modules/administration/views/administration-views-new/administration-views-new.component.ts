import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { Urls } from 'src/app/core/constants/url.constant';
import { Response } from 'src/app/core/models/response.model';

import { Module, ModuleEditData, ModuleEditResponseData, ModuleHierarchiaData } from '../../../../core/models/modules.model';

@Component({
  templateUrl: './administration-views-new.component.html'
})
export class AdministrationViewsNewComponent implements OnInit {


  urlHelper = new Urls
  private apiCreateUrl = this.urlHelper.api.administration.view.create
  private apiSaveUrl = this.urlHelper.api.administration.view.save

  moduleData: ModuleEditData = {}

  originalAllowed?: ModuleHierarchiaData[] = []
  ujHozzadatott?: ModuleHierarchiaData[] = []
  ujEltavolitott?: ModuleHierarchiaData[] = []

  newForm: FormGroup | any
  modules?: Module[]

  constructor(
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.setUpForm()
  }

  setUpForm() {
    this.httpClient.get<ModuleEditResponseData>(`${this.apiCreateUrl}`)
      .pipe(take(1))
      .subscribe((response) => {
        console.log(response)
        this.moduleData = response.data
        this.modules = response.data.module ?? []
        this.moduleData.allowed_positions = []

        this.originalAllowed = []

        this.newForm = new FormGroup({
          uj_hozzaadott: new FormControl(''),
          uj_eltavolitott: new FormControl(''),
          w_vir_modul_id: new FormControl(''),
          ikon: new FormControl(''),
          nev: new FormControl(''),
          nev_url: new FormControl(''),
          url: new FormControl(''),
          id: new FormControl('')
        })
      })
  }

  onSubmit(editForm: FormGroup) {

    this.sendFormDataToApi(editForm.value, this.apiSaveUrl)
  }

  convertChange(data: { allowed: string, removed: string }) {
    this.newForm.controls['uj_hozzaadott'].setValue(data.allowed)
    this.newForm.controls['uj_eltavolitott'].setValue(data.removed)
  }

  sendFormDataToApi(formData: {}, apiUrl: string) {
    this.httpClient.post<Response>(apiUrl, formData, { reportProgress: true })
      .subscribe(response => {
      })
  }
}

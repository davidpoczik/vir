import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { Response } from 'src/app/core/models/response.model';
import { environment } from 'src/environments/environment';
import { Module, ModuleApiResponseData, ModuleEditData, ModuleEditResponseData, ModuleHierarchiaData } from '../shared/modules.model';

@Component({
  templateUrl: './administration-modules-new.component.html'
})
export class AdministrationModulesNewComponent implements OnInit {

  private apiCreateUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.view.create}`
  private apiGetModulesUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.module.get}`
  private apiSaveUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.view.save}`

  moduleData: ModuleEditData = {}

  originalAllowed?: ModuleHierarchiaData[] = []
  ujHozzadatott?: ModuleHierarchiaData[] = []
  ujEltavolitott?: ModuleHierarchiaData[] = []

  newForm: FormGroup | any
  modules?: Module[]

  constructor(
    private httpClient: HttpClient,
    private toastService: HotToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getModules()
    this.setUpForm()
  }

  setUpForm() {
    this.httpClient.get<ModuleEditResponseData>(`${this.apiCreateUrl}`)
      .pipe(take(1))
      .subscribe((response) => {

        this.moduleData = response.data
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

  getModules() {
    this.httpClient.get<ModuleApiResponseData>(this.apiGetModulesUrl).subscribe(response => {
      if (response) {
        this.modules = response?.data
      }
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
    let toast = this.toastService.loading(this.translateService.instant('alert.loading'))
    this.httpClient.post<Response>(apiUrl, formData)
      .subscribe(response => {
        if (response.success) {
          toast.close()
          this.toastService.success(this.translateService.instant(response.message))
        } else {
          this.toastService.error(this.translateService.instant(response.message))
        }
      })
  }
}

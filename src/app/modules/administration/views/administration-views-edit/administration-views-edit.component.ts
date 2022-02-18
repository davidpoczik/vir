import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { Urls } from 'src/app/core/constants/url.constant';
import { Response } from 'src/app/core/models/response.model';

import { Module, ModuleApiResponseData, ModuleEditData, ModuleEditResponseData, ModuleHierarchiaData } from '../../../../core/models/modules.model';

@Component({
  templateUrl: './administration-views-edit.component.html',
})
export class AdministrationViewsEditComponent implements OnInit {

  urlHelper = new Urls
  private apiUrlForGetViews = this.urlHelper.api.views


  private apiEditUrl = this.urlHelper.api.administration.view.edit
  private apiSaveUrl = this.urlHelper.api.administration.view.save
  private apiGetModules = this.urlHelper.api.administration.view.get

  viewID?: number | string
  moduleData: ModuleEditData = {}
  originalAllowed?: ModuleHierarchiaData[] = []
  ujHozzadatott?: ModuleHierarchiaData[] = []
  ujEltavolitott?: ModuleHierarchiaData[] = []
  editForm: FormGroup | any

  modules?: Module[]

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) {
    this.viewID = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getModules()
    this.setUpForm()

  }

  isElementDisabled(data: ModuleHierarchiaData) {
    return this.isElementInArray(data, this.moduleData.allowed_positions)
  }

  onPushToAllowed(elem: ModuleHierarchiaData) {
    this.moduleData.allowed_positions?.push(elem)

    this.ujEltavolitott = this.ujEltavolitott?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    if (!this.isElementInArray(elem, this.originalAllowed)) {
      this.ujHozzadatott?.push(elem)
      this.ujEltavolitott = this.ujEltavolitott?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)
    }
  }

  onRemoveFromAllowed(elem: ModuleHierarchiaData) {
    this.moduleData.allowed_positions = this.moduleData.allowed_positions?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    this.ujHozzadatott = this.ujHozzadatott?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    if (this.isElementInArray(elem, this.originalAllowed)) {
      this.ujEltavolitott?.push(elem)
    }
  }

  onSubmit(editForm: FormGroup) {
    this.sendFormDataToApi(editForm.value, this.apiSaveUrl)
  }

  convertChange(data: { allowed: string, removed: string }) {
    this.editForm.controls['uj_hozzaadott'].setValue(data.allowed)
    this.editForm.controls['uj_eltavolitott'].setValue(data.removed)
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

  isElementInArray(elem: ModuleHierarchiaData, array?: ModuleHierarchiaData[]) {
    return array?.some((arrayElem) => elem.sm_ceghierarchia_id === arrayElem.sm_ceghierarchia_id
    )
  }

  getModules() {
    this.httpClient.get<ModuleApiResponseData>(this.apiGetModules).subscribe(response => {
      if (response) {
        this.modules = response?.data
      }
    })
  }

  setUpForm() {
    this.httpClient.get<ModuleEditResponseData>(`${this.apiEditUrl}?id=${this.viewID}`)
      .pipe(take(1))
      .subscribe((response) => {
        this.moduleData = response.data
        this.originalAllowed = this.moduleData.allowed_positions?.slice()
        if (response.data.view?.length) {
          this.editForm = new FormGroup({
            uj_hozzaadott: new FormControl(''),
            uj_eltavolitott: new FormControl(''),
            w_vir_modul_id: new FormControl(response.data.view[0].w_vir_modul_id),
            ikon: new FormControl(response.data.view[0].ikon),
            nev: new FormControl(response.data.view[0].nev),
            nev_url: new FormControl(response.data.view[0].nev_url),
            url: new FormControl(response.data.view[0].url),
            id: new FormControl(response.data.view[0].w_vir_kepernyo_id)
          })
        }
      })
  }

}

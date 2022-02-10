import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleEditData, ModuleEditResponseData, ModuleHierarchiaData } from '../shared/modules.model';

@Component({
  templateUrl: './administration-modules-edit.component.html',
})
export class AdministrationModulesEditComponent implements OnInit {

  private apiEditUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.view.edit}`

  private apiSaveUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.view.save}`


  viewId?: number | string
  moduleData: ModuleEditData = {}
  originalAllowed?: ModuleHierarchiaData[] = []
  newAllowed?: ModuleHierarchiaData[] = []
  newRemoved?: ModuleHierarchiaData[] = []
  editForm: FormGroup | any

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {


    this.viewId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {

    this.httpClient.get<ModuleEditResponseData>(`${this.apiEditUrl}?id=${this.viewId}`)
      .pipe(take(1))
      .subscribe((response) => {
        this.moduleData = response.data
        this.originalAllowed = this.moduleData.allowed_positions?.slice()
        if (response.data.view?.length) {
          this.editForm = new FormGroup({
            newAllowed: new FormControl(''),
            newRemoved: new FormControl(''),
            w_vir_modul_id: new FormControl(response.data.view[0].w_vir_modul_id),
            ikon: new FormControl(response.data.view[0].ikon),
            nev: new FormControl(response.data.view[0].nev),
            nev_url: new FormControl({ value: response.data.view[0].nev_url, disabled: true }),
            url: new FormControl(response.data.view[0].url),
          })

        }
      })
  }

  isElementDisabled(data: ModuleHierarchiaData) {
    return this.isElementInArray(data, this.moduleData.allowed_positions)
  }

  onPushToAllowed(elem: ModuleHierarchiaData) {
    this.moduleData.allowed_positions?.push(elem)

    this.newRemoved = this.newRemoved?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    if (!this.isElementInArray(elem, this.originalAllowed)) {
      this.newAllowed?.push(elem)
      this.newRemoved = this.newRemoved?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)
    }
  }

  onRemoveFromAllowed(elem: ModuleHierarchiaData) {
    this.moduleData.allowed_positions = this.moduleData.allowed_positions?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    this.newAllowed = this.newAllowed?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    if (this.isElementInArray(elem, this.originalAllowed)) {
      this.newRemoved?.push(elem)
    }
  }

  onSubmit(editForm: FormGroup) {
    console.log(editForm.controls['kep'])



    this.convertChange()
    this.sendFormDataToApi(editForm.value, this.apiSaveUrl)
    console.log(editForm)

  }

  convertChange() {
    const newAllowedJSON = JSON.stringify(this.newAllowed?.map(el => el.sm_ceghierarchia_id))
    const newRemovedJSON = JSON.stringify(this.newRemoved?.map(el => el.sm_ceghierarchia_id))
    this.editForm.controls['newAllowed'].setValue(newAllowedJSON)
    this.editForm.controls['newRemoved'].setValue(newRemovedJSON)
  }

  sendFormDataToApi(formData: {}, apiUrl: string) {
    ///administration/save-module 

    this.httpClient.post(apiUrl, formData).subscribe(response => {
      console.log('response', response)
    })
  }

  isElementInArray(elem: ModuleHierarchiaData, array?: ModuleHierarchiaData[]) {
    return array?.some((arrayElem) => elem.sm_ceghierarchia_id === arrayElem.sm_ceghierarchia_id
    )
  }
}

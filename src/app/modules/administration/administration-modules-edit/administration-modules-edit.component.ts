import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ModuleEditData, ModuleEditResponseData, ModuleHierarchiaData } from '../shared/modules.model';
@Component({
  templateUrl: './administration-modules-edit.component.html',
})
export class AdministrationModulesEditComponent implements OnInit {

  private apiEditUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.modules.edit}`

  private apiSaveUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.modules.save}`
  moduleData: ModuleEditData = {}

  originalAllowed?: ModuleHierarchiaData[] = []
  newAllowed?: ModuleHierarchiaData[] = []
  newRemoved?: ModuleHierarchiaData[] = []

  editForm: FormGroup

  constructor(
    private httpClient: HttpClient
  ) {
    this.editForm = new FormGroup({
      newAllowed: new FormControl(''),
      newRemoved: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.httpClient.get<ModuleEditResponseData>(`${this.apiEditUrl}?id=3`).subscribe((response) => {
      this.moduleData = response.data
      this.originalAllowed = this.moduleData.allowed_positions?.slice()

      if (response.data.module?.length) {
        for (const [key, value] of Object.entries(response.data.module[0])) {
          this.editForm.addControl(key, new FormControl(value))
        }
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

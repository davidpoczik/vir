import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModuleEditData, ModuleEditResponseData, ModuleHierarchiaData } from '../shared/modules.model';
@Component({
  templateUrl: './administration-modules-edit.component.html',
})
export class AdministrationModulesEditComponent implements OnInit {

  moduleData: ModuleEditData = {}

  tempAllowed_positions?: ModuleHierarchiaData[]
  tempEmployee_positions?: ModuleHierarchiaData[]

  originalAllowed_positions?: ModuleHierarchiaData[]
  originalEmployee_positions?: ModuleHierarchiaData[]

  pushedAllowed_positions: ModuleHierarchiaData[]
  removedAllowed_positions: ModuleHierarchiaData[]

  private apiEditUrl = `${environment.api.base}${environment.api.administration.base}${environment.api.administration.modules.edit}`


  constructor(
    private httpClient: HttpClient
  ) {
    this.pushedAllowed_positions = []
    this.removedAllowed_positions = []

    this.tempAllowed_positions = []
    this.tempEmployee_positions = []
  }

  ngOnInit(): void {
    this.httpClient.get<ModuleEditResponseData>(`${this.apiEditUrl}?id=3`).subscribe((response) => {
      this.moduleData = response.data
      this.originalAllowed_positions = this.moduleData.allowed_positions
      this.originalEmployee_positions = this.moduleData.employee_positions

      this.tempAllowed_positions = this.moduleData.allowed_positions

    })
  }

  onEmployeeToAllowed(data: ModuleHierarchiaData) {
    this.tempAllowed_positions?.push(data)

    this.tempEmployee_positions?.filter(tempData => tempData.sm_ceghierarchia_id !== data.sm_ceghierarchia_id)

    this.moduleData.allowed_positions = this.tempAllowed_positions

    if (this.originalAllowed_positions?.some(hierdata => hierdata.sm_ceghierarchia_id === data.sm_ceghierarchia_id)) {
      this.pushedAllowed_positions.push(data)
    }



    console.log(this.removedAllowed_positions, this.pushedAllowed_positions)
  }

  onAllowedToEmployee(data: ModuleHierarchiaData) {

  }



  isElementDisabled(data: number | string) {
    return this.tempAllowed_positions?.some((tempData) => tempData.sm_ceghierarchia_id === data
    )
  }



}

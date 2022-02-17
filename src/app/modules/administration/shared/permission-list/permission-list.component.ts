import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ModuleHierarchiaData } from '../modules.model';

@Component({
  selector: 'gastroprof-permission-list',
  templateUrl: './permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionListComponent implements OnInit, OnChanges {

  @Input() originalAllowed?: ModuleHierarchiaData[] = []
  @Input() employeePositions?: ModuleHierarchiaData[] = []
  @Input() allowedPositions?: ModuleHierarchiaData[] = []

  @Output() newAndRemovedChange = new EventEmitter<{ allowed: string, removed: string }>();

  newAllowed?: ModuleHierarchiaData[] = []
  newRemoved?: ModuleHierarchiaData[] = []


  constructor() {

  }
  ngOnChanges(): void {
    this.allowedPositions = this.originalAllowed?.slice()
    console.log(this.allowedPositions)
  }

  ngOnInit(): void {

  }

  isElementDisabled(data: ModuleHierarchiaData) {
    return this.isElementInArray(data, this.allowedPositions)
  }

  isElementInArray(elem: ModuleHierarchiaData, array?: ModuleHierarchiaData[]) {
    return array?.some((arrayElem) => elem.sm_ceghierarchia_id === arrayElem.sm_ceghierarchia_id
    )
  }


  onPushToAllowed(elem: ModuleHierarchiaData) {
    this.allowedPositions?.push(elem)

    this.newRemoved = this.newRemoved?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    console.log(elem, this.originalAllowed)

    if (!this.isElementInArray(elem, this.originalAllowed)) {
      this.newAllowed?.push(elem)
      this.newRemoved = this.newRemoved?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)
    }
    this.convertChange()
  }

  onRemoveFromAllowed(elem: ModuleHierarchiaData) {
    this.allowedPositions = this.allowedPositions?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)
    this.newAllowed = this.newAllowed?.filter(originalElement => originalElement.sm_ceghierarchia_id !== elem.sm_ceghierarchia_id)

    if (this.isElementInArray(elem, this.originalAllowed)) {
      this.newRemoved?.push(elem)
    }
    this.convertChange()
  }


  convertChange() {
    console.log(this.newAllowed, this.newRemoved)
    const ujHozzadatottJSON = JSON.stringify(this.newAllowed?.map(el => el.sm_ceghierarchia_id))
    const ujEltavolitottJSON = JSON.stringify(this.newRemoved?.map(el => el.sm_ceghierarchia_id))

    this.newAndRemovedChange.emit({
      allowed: ujHozzadatottJSON,
      removed: ujEltavolitottJSON
    })

  }

}

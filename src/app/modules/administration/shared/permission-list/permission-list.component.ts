import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Generic } from './generic.model';

@Component({
  selector: 'gastroprof-permission-list',
  templateUrl: './permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionListComponent implements OnInit, OnChanges {

  @Input() originalAllowed?: any[] = []
  @Input() all?: any[] = []
  @Input() allowed?: any[] = []

  @Output() newAndRemovedChange = new EventEmitter<{ allowed: string, removed: string }>();

  newAllowed?: Generic[] = []
  newRemoved?: Generic[] = []

  bluepintForList: [][]

  constructor(
    private route: ActivatedRoute
  ) {
    this.bluepintForList = this.route.snapshot.data['listBlueprint']
  }

  ngOnChanges(): void {
    this.originalAllowed = this.convertInput(this.originalAllowed)
    this.allowed = this.originalAllowed?.slice()
    this.all = this.convertInput(this.all)
  }

  ngOnInit(): void { }

  convertInput(object?: any[]) {
    let blueprint = this.bluepintForList

    let [idBlueprint, nameBlueprint, ...rest] = blueprint

    return object?.slice().map((el) => {

      let id = Array()
      let name = Array()

      if (this.bluepintForList) {

        idBlueprint.forEach((idKey) => {
          id.push(el[idKey])
        }, '')

        nameBlueprint.forEach((nameKey) => {
          name.push(el[nameKey])
        }, '')

      }
      return {
        id: id.join(','),
        name: name.join(', ')
      }
    })

  }

  isElementDisabled(data: Generic) {
    return this.isElementInArray(data, this.allowed)
  }

  isElementInArray(elem: Generic, array?: Generic[]) {
    return array?.some((arrayElem) => elem.id === arrayElem.id
    )
  }

  onPushToAllowed(elem: Generic) {
    this.allowed?.push(elem)
    this.newRemoved = this.newRemoved?.filter(originalElement => originalElement.id !== elem.id)
    if (!this.isElementInArray(elem, this.originalAllowed)) {
      this.newAllowed?.push(elem)
      this.newRemoved = this.newRemoved?.filter(originalElement => originalElement.id !== elem.id)
    }
    this.convertChange()
  }

  onRemoveFromAllowed(elem: Generic) {
    this.allowed = this.allowed?.filter(originalElement => originalElement.id !== elem.id)
    this.newAllowed = this.newAllowed?.filter(originalElement => originalElement.id !== elem.id)

    if (this.isElementInArray(elem, this.originalAllowed)) {
      this.newRemoved?.push(elem)
    }
    this.convertChange()
  }

  convertChange() {
    const ujHozzadatottJSON = JSON.stringify(this.newAllowed?.map(el => el.id))
    const ujEltavolitottJSON = JSON.stringify(this.newRemoved?.map(el => el.id))
    this.newAndRemovedChange.emit({
      allowed: ujHozzadatottJSON,
      removed: ujEltavolitottJSON
    })
  }

}
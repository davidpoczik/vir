import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PermissionsResponse } from 'src/app/core/models/permissions.model';
import { Employee } from 'src/app/core/models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Urls } from 'src/app/core/constants/url.constant';
@Component({
  templateUrl: './administration-permissions-edit.component.html',
})
export class AdministrationPermissionsEditComponent implements OnInit, OnDestroy {

  id = this.route.snapshot.params['id']
  permissionName?: string

  urlHelper = new Urls
  apiEditPermissionsUrl = this.urlHelper.api.administration.permission.edit + `?id=${this.id}`
  apiSavePermissionsUrl = this.urlHelper.api.administration.permission.save

  all?: Employee[]
  allowed?: Employee[]
  dataSubscription?: Subscription
  editForm?: FormGroup

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.editForm = this.setupForm()
  }

  ngOnInit(): void {
    this.dataSubscription = this.setupDataForList()
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe()
  }

  onSubmit(form: FormGroup) {

    this.httpClient.post(this.apiSavePermissionsUrl, form.value, { reportProgress: true })
      .subscribe(response => {
      })
  }

  setupForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      uj_hozzaadott: new FormControl(''),
      uj_eltavolitott: new FormControl('')
    })
  }

  setupDataForList() {
    return this.httpClient.get<PermissionsResponse>(this.apiEditPermissionsUrl)
      .subscribe((response) => {
        this.all = response.data.all_employees
        this.allowed = response.data.allowed_positions
        this.permissionName = response.data?.permission?.nev
      })
  }

  convertChange(data: { allowed: string, removed: string }) {
    if (this.editForm) {
      this.editForm.controls['uj_hozzaadott'].setValue(data.allowed)
      this.editForm.controls['uj_eltavolitott'].setValue(data.removed)
    }
  }

}
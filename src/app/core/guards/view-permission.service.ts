import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ViewPermissionGuard implements CanActivateChild {

    private apiUrl = `${environment.api.base}${environment.api.validate.view}`

    constructor(
        private httpClient: HttpClient
    ) {
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<any | UrlTree> | Promise<boolean | UrlTree> {

        return this.httpClient.get(this.apiUrl + '?id=' + route.params['viewID']).pipe(
            map(response => {
                console.log(response)
                if (response) {
                    return true
                } else {
                    return false
                }
            }),
            catchError((error) => {
                return of(false)
            })
        )

    }
}

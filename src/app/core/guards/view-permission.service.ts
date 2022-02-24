import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { Urls } from "../constants/url.constant";

@Injectable({
    providedIn: 'root'
})
export class ViewPermissionGuard implements CanActivateChild {

    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<any | UrlTree> | Promise<boolean | UrlTree> {

        const urlHelper = new Urls

        const apiUrl = [
            urlHelper.api.validate.view,
            route.params['viewID']
        ].join('?id=')

        return this.httpClient.get(apiUrl).pipe(
            map(response => {

                return !!response
            }),
            catchError((error) => {
                return of(false)
            })
        )

    }
}

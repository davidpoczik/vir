import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { take } from "rxjs";
import { environment } from "src/environments/environment";
import { ModuleEditResponseData } from "./modules.model";

@Injectable({
    providedIn: 'root'
})
export class AdministrationService {


    constructor(
        private httpClient: HttpClient
    ) {
    }


}
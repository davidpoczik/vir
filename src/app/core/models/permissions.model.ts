import { Employee } from "./employee.model";
import { Response } from "./response.model";

export interface Permission {
    w_vir_csop_jogosultsag_id: string | number,
    nev: string
}

export interface PermissionData {
    csoport: string,
    jogosultak: string,
    nev: string,
    w_vir_csop_jogosultsag_id: string | number
}

export interface PermissionsResponse extends Response {
    data: {
        all_employees: Employee[],
        allowed_positions: Employee[],
        permission?: PermissionData
    }
}


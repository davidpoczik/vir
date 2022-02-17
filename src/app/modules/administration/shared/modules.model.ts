export interface Module {
    ikon?: string,
    kep?: string,
    leiras?: string,
    nev: string,
    nev_url: string,
    url?: string,
    w_vir_modul_id: string | number,
    w_vir_kepernyo_id?: string | number
}

export interface View {
    ikon?: string,
    kep?: string,
    leiras?: string,
    nev: string,
    nev_url: string,
    url?: string,
    w_vir_modul_id: string | number,
    w_vir_kepernyo_id?: string | number
}
export interface ViewResponse {
    count: number,
    views: View[]
}


export interface ViewItemWithKey {
    [key: number]: View[]
}

export interface ViewApiResponseData {
    success: boolean,
    data: ViewResponse,
    message: string
}

export interface ModuleItemWithKey {
    [key: number]: Module
}

export interface ModuleApiResponseData {
    success: boolean,
    data: Module[],
    message: string
}

export interface ModuleHierarchiaData {
    nev: string,
    sm_ceghierarchia_id: string | number
}

export interface ModuleEditData {
    allowed_positions?: ModuleHierarchiaData[],
    employee_positions?: ModuleHierarchiaData[],
    module?: Module[],
    view?: Module[],
    csrf?: string
}

export interface ModuleEditResponseData {
    success: boolean,
    data: ModuleEditData,
    message: string
}

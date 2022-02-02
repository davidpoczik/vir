export interface Module {
    ikon?: string,
    kep?: string,
    leiras?: string,
    nev: string,
    nev_url: string,
    url?: string,
    w_vir_modul_id: string | number
}

export interface ModuleItemWithKey {
    [key: number]: Module
}
export interface ModuleApiResponseData {
    success: boolean,
    data: ModuleItemWithKey,
    message: string
}


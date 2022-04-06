import { Response } from "../models/response.model"

export interface Storage {
    akt_menny: string
    cikk_nev: string,
    ck_cikk_id: string,
    idopont: string,
    munk: string,
    utolso_betolt_menny: string,
    utolso_betolt_rakat: string,
    message: string,
    success: boolean
}

export interface CheckResponse extends Response {
    success: boolean,
    message: string
    data: {
        storage: Storage
    }
}

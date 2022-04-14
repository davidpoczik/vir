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
    success: boolean,
    k_rakat_id?: string,
    nev?: string,
    brutto_menny?: string,
    k_raktar_id?: string,
    k_raktar_nev?: string,
    k_trh_id?: string,
    k_trh_nev?: string,
    kom_info?: string,
    kom_seq?: string,
    lejarat_datum?: string,
    me_?: string,
    mennyiseg?: string,
    tara?: string
}

export interface CheckResponse extends Response {
    success: boolean,
    message: string
    data: {
        storage: Storage,
        product?: Storage,
        storage_data: Storage[],
        amount: number,
        storage_code?: string
    },

}

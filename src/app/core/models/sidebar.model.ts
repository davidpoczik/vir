export interface SidebarMenuItem {
    id: number,
    url?: string,
    nev: string,
    alias: string,
    ikon: string,
    leiras?: string,
    kep?: string,
    szulo_id?: string,
    modul_id?: string
}





export interface SidebarApiResponseData {
    success: boolean,
    data: SidebarMenuItem[],
    message: string
}


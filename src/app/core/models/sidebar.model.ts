
export interface SidebarMenuItem {
    id: number,
    url?: string,
    nev: string,
    alias: string,
    ikon: string,
    leiras?: string,
    kep?: string,
    szulo_id?: string,
    modul_id?: string,
    submenu: SidebarMenuItem[]
}
export interface SidebarMenuWithKey {
    [key: number]:
    SidebarMenuItem
}



export interface Sidebar {
    menu: SidebarMenuWithKey,
    type: number
}

export interface SidebarApiResponseData {
    success: boolean,
    data: Sidebar,
    message: string
}


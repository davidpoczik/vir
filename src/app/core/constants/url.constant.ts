import { environment } from "src/environments/environment";

export class Urls {

    base = environment.api.base
    api = {
        login: this.base + `login`,
        modules: this.base + `general/get-modules`,
        views: this.base + `general/get-views`,
        validate: {
            view: this.base + `general/validate-view-permission`,
            module: this.base + `general/validate-module-permission`,
        },
        administration: {
            module: {
                get: this.base + `administration/get-modules`,
                edit: this.base + `administration/edit-module`,
                save: this.base + `administration/save-module`,
            },
            view: {
                get: this.base + `administration/get-views`,
                edit: this.base + `administration/edit-view`,
                save: this.base + `administration/save-view`,
                create: this.base + `administration/create-view`
            },
            permission: {
                get: this.base + `administration/get-group-permissions`,
                edit: this.base + `administration/edit-group-permission`,
                save: this.base + `administration/update-group-permission`
            }
        },

    }
    pda = {
        storageCheck: this.base + "warehouse/pda/storage-checker",
        storeToBase: this.base + "warehouse/pda/store-to-base",
        storeToCommission: this.base + "warehouse/pda/comission-transfer",
        stackCheck: this.base + "warehouse/pda/get-stack",
        loadingRequestCheck: this.base + "warehouse/pda/loading-request-checker",
        loadingRequestSave: this.base + "warehouse/pda/loading-request-save",
        barcodeChecker: this.base + "warehouse/pda/barcode-checker",
        pairingChecker: this.base + "warehouse/pda/pairing-checker",
        inventorialChecker: this.base + "warehouse/pda/inventorial-checker",
        pairingLog: this.base + "warehouse/pda/pairing-log",

    }
}



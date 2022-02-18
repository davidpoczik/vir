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
}



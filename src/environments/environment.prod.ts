
export const environment = {
  production: true,
  version: 1.1,
  baseUrl: `./app/src`,


  api: {
    base: `https://dev-api.gastroprof.com/api/`,
    login: `login`,
    modules: `general/get-modules`,
    views: `general/get-views`,
    validate: {
      view: `general/validate-view-permission`,
      module: `general/validate-module-permission`,

    },
    administration: {
      base: `administration/`,
      module: {
        get: `get-modules`,
        save: `save-module`,
        edit: `edit-module`
      },
      view: {
        get: `get-views`,
        save: `save-view`,
        edit: `edit-view`,
        create: `create-view`
      },
      permission: {
        get: `get-group-permissions`,
        edit: `edit-group-permission`,
        update: `update-group-permission`
      }
    },
  }
}; 

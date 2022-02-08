
export const environment = {
  production: false,
  version: 1.1,
  baseUrl: `./app/src`,


  api: {
    base: `https://dev.matusz-vad.hu/dev/Vir/api/`,
    login: `login`,
    modules: `general/get-modules`,
    views: `general/get-views`,
    validate: {
      view: `general/validate-view-permission`,
      module: `general/validate-module-permission`
    },
    administration: {
      base: `administration/`,
      modules: {
        get: `get-modules`,
        save: `save-module`,
        edit: `edit-module`
      }
    },
  }
};

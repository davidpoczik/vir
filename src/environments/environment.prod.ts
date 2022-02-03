export const environment = {
  production: true,
  version: 1,
  baseUrl: './app/src',
  api: {
    base: 'https://dev.matusz-vad.hu/dev/Vir/api/',
    login: `login`,
    modules: `general/get-modules`,
    views: `general/get-views`,
    administration: {
      base: `administration/`,
      modules: `get-modules`
    }

  }
};

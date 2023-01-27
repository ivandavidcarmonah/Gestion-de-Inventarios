// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const URL_BASE = `http://localhost:8080/api/`;

export const API_ROUTES = {
  //Logeo de usuario
  AUTH: `auth/login`,
  VALID_TOKEN: `auth/token-valid`,


  //USER CONTROLLER
  USERS_LIST: `user/list-users`,
  USER_BYID: `user/edit-user/`,
  USER_UPDATE: `user/update-user/`,
  USER_INSERT: `user/new-user/`,

  //ROLES CONTROLLER
  ROLES_LIST: `roles/list-roles`,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

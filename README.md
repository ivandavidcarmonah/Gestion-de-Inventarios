# Admin Dashboard - Gestion de Inventarios

Es una plantilla de panel de Administracion que realiza peticiones al API () , Cuenta con modulo de Login con Autenticacion y Autorizaciones mediante Token.
Cuenta con modulo de productos 


![Panel de Administracion de Usuarios - Listado](https://ivantxodev.com/wp-content/uploads/2023/02/panel-user.png)

![Panel de Administracion de productos](https://ivantxodev.com/wp-content/uploads/2023/02/admin-panel.png)

![Panel de Administracion de productos](https://ivantxodev.com/wp-content/uploads/2023/02/panel-multi.png)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.


## Development server

Para ejecutar el proyecto debe descargar primero las  dependencias del proyecto Run `npm i` o `npm i --force`, luego ejecute el servidor con  `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Este template cuenta con diversos modulos que hacen al proyecto altamente escalable.
Es un Admin Dashboar Template  Premiun, 100% responsive que cuenta con botonera por defecto.



##Conectando con el Api URL

Link repositorio backend [repositorio backend https://github.com/ivandavidcarmonah/Api-de-Gestion-de-Inventarios](https://github.com/ivandavidcarmonah/Api-de-Gestion-de-Inventarios)
`export const ROLES = {
  ROLE_SUPER_ROOT: `ROLE_SUPER_ROOT`,
  ROLE_ADMIN: `ROLE_ADMIN`,
  ROLE_EDITOR: `ROLE_EDITOR`,
  ROLE_VISITANTE: `ROLE_VISITANTE`,
  ROLE_CLIENTE: `ROLE_CLIENTE`
}

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
  USER_DELETE: `user/delete/`,

  //PRODUCT CONTROLLER
  PRODUCT_LIST: `product/list-products`,
  PRODUCT_BYID: `product/product/`,
  PRODUCT_UPDATE: `product/update-product/`,
  PRODUCT_INSERT: `product/new-product/`,
  PRODUCT_DELETE: `product/delete/`,
  PRODUCT_GET_IMAGEN: 'product/get-file/',
  PRODUCT_GET_IMAGEN_BAR_CODE: 'product/get-bar-code/',
  PRODUCT_SAVE_IMAGEN: 'product/save-file/',

  //ROLES CONTROLLER
  ROLES_LIST: `roles/list-roles`,

  //MASTER DATA
  GENDERS: `master-data/genders`,//Generos
  LANGUAGES: `master-data/languages`,//Generos

};`

Tengo Un api construida que funciona con este template

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


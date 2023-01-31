import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IRoles } from 'src/app/interfaces/roles.interface';
import { URL_BASE, API_ROUTES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get<IRoles[]>(`${URL_BASE}${API_ROUTES.ROLES_LIST}`).pipe(
      map(
        roles => {
          return roles;
        }
      )
    )
  }

}

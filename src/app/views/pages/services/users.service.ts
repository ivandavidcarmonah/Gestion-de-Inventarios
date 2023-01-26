import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ListUsers } from 'src/app/class/user.interface';
import { API_ROUTES, URL_BASE } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { }

  getUsers(){
    return this.http.get<ListUsers>(`${URL_BASE}${API_ROUTES.USERS_LIST}`).pipe(
      map(
        user => {
          return user;
        }
      )
    )
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ListUsers, UserDetail } from 'src/app/class/user.interface';
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

  getUsersDatas(numberPage: number, pageSize: number, orderBy: string, sortDir: string ){
    return this.http.get<ListUsers>(`${URL_BASE}${API_ROUTES.USERS_LIST}?numberPage=${numberPage}&pageSize=${pageSize}&orderBy=${orderBy}&sortDir=${sortDir}`).pipe(
      map(
        user => {
          return user;
        }
      )
    )
  }

  getUserById(id: string | null) {
    return this.http.get<UserDetail>(`${URL_BASE}${API_ROUTES.USER_BYID}${id}`).pipe(
      map(
        user => {
          return user;
        }
      )
    )
  }

  saveUser(update: UserDetail, id: string | null) {
    
    let body = {
      id: id,
      username: update.username,
      name: update.name,
      email: update.email,
      numberPhone: update.numberPhone,
      roles: update.roles,
      gender: update.gender,
      language: update.language,
      birthDate: update.birthDate

    }
    if (id !== null) {
      return this.http.put<UserDetail>(`${URL_BASE}${API_ROUTES.USER_UPDATE}`, body).pipe(
        map(
          user => {
            return user;
          }
        )
      )
    }
    else {
      return this.http.post<UserDetail>(`${URL_BASE}${API_ROUTES.USER_INSERT}`, body).pipe(
        map(
          user => {
            return user;
          }
        ) 
        
      )
    }
    
  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginResponse, UserDTO } from 'src/app/interfaces/auth-class';
import { API_ROUTES, URL_BASE } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserDTO | null>;
  public user: Observable<UserDTO | null>;


  public get userValue() {
    return this.userSubject.value;
  }

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getData('UserData')!));
    this.user = this.userSubject.asObservable();
  }


  login(usernameOrEmail: string, password: string){
    const body = {
      usernameOrEmail: usernameOrEmail,
      password: password
    }
    return this.http.post<LoginResponse>(`${URL_BASE}${API_ROUTES.AUTH}`, body)
    .pipe(
      map(resp => {
        if (resp.ok) {
          this.localStorage.saveData("tokenAcces", resp.tokenAcces);
          this.localStorage.saveData("tokenType", resp.tokenType);
          this.localStorage.saveData("UserData",JSON.stringify( resp.userDTO));
          this.userSubject.next(resp.userDTO);
        } 
      })
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.localStorage.removeData('tokenAcces');
    this.localStorage.removeData("tokenType");
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  validToken(){
    return this.http.get<any>(`${URL_BASE}${API_ROUTES.VALID_TOKEN}`).subscribe(res => {
      if (!res) {
        this.logout();
      }
      return true;
    }, err => {
      this.logout();
    })
  }



}

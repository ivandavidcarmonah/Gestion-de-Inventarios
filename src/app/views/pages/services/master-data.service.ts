import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IGenders } from 'src/app/class/master-data';
import { API_ROUTES, URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private http: HttpClient) { }

  getGenders(){
    return this.http.get<IGenders[]>(`${URL_BASE}${API_ROUTES.GENDERS}`).pipe(
      map(
        values => {
          return values;
        }
      )
    )
  }


}

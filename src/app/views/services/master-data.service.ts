import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IGender, ILanguage } from 'src/app/class/master-data';
import { API_ROUTES, URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private http: HttpClient) { }

  getGenders(){
    return this.http.get<IGender[]>(`${URL_BASE}${API_ROUTES.GENDERS}`).pipe(
      map(
        values => {
          return values;
        }
      )
    )
  }
  getLanguages(){
    return this.http.get<ILanguage[]>(`${URL_BASE}${API_ROUTES.LANGUAGES}`).pipe(
      map(
        values => {
          return values;
        }
      )
    )
  }


}

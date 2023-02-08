import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductResponseDTO } from 'src/app/class/product.interface';
import { API_ROUTES, URL_BASE } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { }


  getProducts(numberPage: number, pageSize: number, orderBy: string, sortDir: string){
    return this.http.get<ProductResponseDTO>(`${URL_BASE}${API_ROUTES.PRODUCT_LIST}?numberPage=${numberPage}&pageSize=${pageSize}&orderBy=${orderBy}&sortDir=${sortDir}`).pipe
    (
      map(
        dataResponse => {
          return dataResponse;
        }
      ) 
    )
  }

  delete(id: number){
    return this.http.delete<string>(`${URL_BASE}${API_ROUTES.PRODUCT_DELETE}${id}`).pipe(
      map(
        res => {
          return res;
        }
      )
    )
  }

}

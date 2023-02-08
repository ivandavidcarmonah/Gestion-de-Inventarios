import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductDTO, ProductResponseDTO } from 'src/app/class/product.interface';
import { API_ROUTES, URL_BASE } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { }

  getById(id: string | null) {
    return this.http.get<ProductDTO>(`${URL_BASE}${API_ROUTES.PRODUCT_BYID}${id}`).pipe
    (
      map(
        dataResponse => {
          return dataResponse;
        }
      ) 
    )
  }

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

  save(update: ProductDTO, id: string | null) {
    
    let body = {
      id: id,
      name: update.name,
      description: update.description,
      allergies: update.allergies,
      valid: update.valid,
      price: update.price,
      picture: update.picture,
      company: update.company,
      spent: update.spent,
      preparesin: update.preparesin || "no",

    }
    if (id !== null) {
      return this.http.put<ProductDTO>(`${URL_BASE}${API_ROUTES.PRODUCT_UPDATE}`, body).pipe(
        map(
          user => {
            return user;
          }
        )
      )
    }
    else {
      return this.http.post<ProductDTO>(`${URL_BASE}${API_ROUTES.PRODUCT_INSERT}`, body).pipe(
        map(
          user => {
            return user;
          }
        ) 
        
      )
    }
    
  }

}

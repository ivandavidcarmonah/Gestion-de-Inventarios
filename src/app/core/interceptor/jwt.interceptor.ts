import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LocalStorageService } from 'src/app/views/services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.localStorageService.getData('tokenAcces');
    let req = request;
    if (token !== null) {
        const tokenType = this.localStorageService.getData('tokenType');
      req = request.clone({
        setHeaders: {
          authorization: `${tokenType} ${token}`
        }
      });
    }
    return next.handle(req);

  }
}
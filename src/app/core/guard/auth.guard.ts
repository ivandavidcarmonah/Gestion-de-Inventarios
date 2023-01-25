import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/pages/services/auth.service';
import { API_ROUTES } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
    if (this.authService.validToken()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate([`${API_ROUTES.AUTH}`], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
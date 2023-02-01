import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Role } from 'src/app/class/user.interface';
import { IRoles } from 'src/app/interfaces/roles.interface';
import { AuthService } from 'src/app/views/pages/services/auth.service';
import { API_ROUTES } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
    if (this.authService.validToken()) {
      return this.checkRoles(route);;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate([`${API_ROUTES.AUTH}`], { queryParams: { returnUrl: state.url } });
    return false;
  }
  checkRoles(route: ActivatedRouteSnapshot) {
    const scopes: Role[] | undefined = this.authService.userValue?.roles;
    const rolesRoute: string[] = route.data.role;
    if (scopes !== undefined && rolesRoute !== undefined) {
      for (let index = 0; index < scopes.length; index++) {
        const element = scopes[index].name;
        if (rolesRoute.indexOf(element) !== -1) {
          return true;
        }
      }
    }

    return false;
  }
}
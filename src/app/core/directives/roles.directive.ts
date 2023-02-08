import { Directive, Input, OnInit, Output } from '@angular/core';
import { Role } from 'src/app/class/user.interface';
import { AuthService } from 'src/app/views/services/auth.service';
import { ROLES } from 'src/environments/environment';

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective{
  currentRoles?: Role[] = this.authService.userValue?.roles;
  constructor(private authService: AuthService) { 
    this.authService.user.subscribe(() => {
      this.currentRoles = this.authService.userValue?.roles;
    })
  }


  


  checkRoles() {
    // ROLES.ROLE_SUPER_ROOT, ROLES.ROLE_EDITOR, ROLES.ROLE_ADMIN
    if (this.currentRoles !== undefined) {
      for (let index = 0; index < this.currentRoles.length; index++) {
        const rol = this.currentRoles[index];
        if (rol.name == ROLES.ROLE_SUPER_ROOT || rol.name == ROLES.ROLE_EDITOR || rol.name == ROLES.ROLE_ADMIN){
          return true;
        }
      }
    }
    return false;
  }
    

}

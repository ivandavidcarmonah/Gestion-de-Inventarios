import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { IGender, ILanguage } from 'src/app/class/master-data';
import {  Role, UserDetail } from 'src/app/class/user.interface';
import { RolesDirective } from 'src/app/core/directives/roles.directive';
import { IRoles } from 'src/app/interfaces/roles.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { MasterDataService } from '../../../services/master-data.service';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @ViewChild('ngSelectRoles') ngSelectRoles: NgSelectComponent;
  @ViewChild('ngSelectGender') ngSelectGender: NgSelectComponent;
  @ViewChild('ngSelectLanguage') ngSelectLanguage: NgSelectComponent;



  public id: string | null;
  public formGroup: FormGroup;
  public userDetail: UserDetail;
  
  currentRoles?: Role[] = this.authService.userValue?.roles;

  roles: IRoles[] = [];
  genders: IGender[];
  languages: ILanguage[];

  selectedRol: IRoles[] = [];
  selectedGender: number;
  selectedLanguage: number;

  get permit():boolean{
    return this.permisos.checkRoles()
  }


  constructor(private permisos: RolesDirective,
      private authService: AuthService, private masterDataService: MasterDataService, private rolesService: RolesService, private route: ActivatedRoute, private userService: UsersService, private router: Router, private formBuilder: FormBuilder) { 
    this.masterData();
    this.formGroup = this.formBuilder.group({
      username:  ["", Validators.required],
      name:     ["", Validators.required],
      email:  ["", Validators.required],
      birthDate:  [""],
      numberPhone: [""],
      pictureUser:  [""],
    });

  }
  masterData() {
    this.getRoles();
    this.getGenders();
    this.getLanguages();
  }
  getLanguages() {
    this.masterDataService.getLanguages()
      .subscribe(res => {
        this.languages = res
    });
  }

  getGenders() {
    this.masterDataService.getGenders()
      .subscribe(res => {
        this.genders = res
    });
  }
  getRoles() {
    this.rolesService.getRoles()
      .subscribe(res => {
        this.roles = res
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =   params.get('id');
      if (this.id !== null) {
        this.getUserById();
      }
    });
  }
  getUserById() {
    this.userService.getUserById(this.id)
      .subscribe(res  => {
        this.userDetail = res
        this.setDataForm();
        this.setRoles();
        this.setGender();
        this.setLanguage();
      });
    
  }
  setGender() {
    this.selectedGender = this.userDetail.gender.id;
  }

  setLanguage() {
    this.selectedLanguage = this.userDetail.language.id;
  }

  setRoles() {
    this.userDetail.roles.forEach(rol => {
      this.selectedRol.push(rol);
      let item = this.ngSelectRoles.itemsList.findByLabel(rol.name);
      this.ngSelectRoles.select(item);
    });
  }
  setDataForm() {

    this.formGroup.patchValue({"name": this.userDetail.name})
    this.formGroup.patchValue({"username": this.userDetail.username})
    this.formGroup.patchValue({"email": this.userDetail.email})
    this.formGroup.patchValue({"birthDate":  this.userDetail.birthDate})
    this.formGroup.patchValue({"numberPhone": this.userDetail.numberPhone})
    this.formGroup.patchValue({"pictureUser": this.userDetail.pictureUser})
  }


  saveData(){
    if(this.formGroup.valid){
      let update: UserDetail  =   this.formGroup.value;
      console.log(update)
      update.roles = [];
      if (this.ngSelectRoles.selectedValues.length > 0) {
        this.ngSelectRoles.selectedValues.forEach(rol => {
          update.roles.push(rol);
        })
      }
  
      if (this.ngSelectGender.selectedValues.length > 0) {
        this.ngSelectGender.selectedValues.forEach(res => {
          update.gender = res;
        })
      }
  
      if (this.ngSelectLanguage.selectedValues.length > 0) {
        this.ngSelectLanguage.selectedValues.forEach(res => {
          update.language = res;
        })
      }
  
  
      this.userService.saveUser(update, this.id).subscribe({
        next: (res => {
          this.userDetail = res
         
          this.setRoles();
        }),
        error: (err => {
          console.log(err)
          Swal.fire("Error", err.error, "error")
        }),
        complete: () => {
          if (this.id !== null) {
            Swal.fire("Actualizado", "Actualizado correctamente", "success")
          }
          else {
            Swal.fire("Creado", "Creado correctamente", "success")
          }
          this.id = this.userDetail.id.toString();
          
        },
      });

    }
    
  }

  regresar(){
    this.router.navigate(['users/list-user/']);
  }



}

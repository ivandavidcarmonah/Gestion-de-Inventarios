import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import {  UserDetail } from 'src/app/class/user.interface';
import { RolesI } from 'src/app/interfaces/roles.interface';
import Swal from 'sweetalert2';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @ViewChild(NgSelectComponent) ngSelect: NgSelectComponent;

  public id: string | null;
  public formGroup: FormGroup;
  public userDetail: UserDetail;

  selectedRol: RolesI[] = [];
  roles: RolesI[] = [];
  constructor(private rolesService: RolesService, private route: ActivatedRoute, private userService: UsersService, private router: Router, private formBuilder: FormBuilder) { 
    this.masterData();
    this.formGroup = this.formBuilder.group({
      id: [""],
      username:  ["", Validators.required],
      name:     ["", Validators.required],
      email:  ["", Validators.required],
      birthDate:  [""],
      numberPhone: [""],
      password:    ["", Validators.required],
      pictureUser:  [""],
      idGender:  [""],
      idLanguage:   [""],
    });

  }
  masterData() {
    this.getRoles();
  }
  getRoles() {
    this.rolesService.getRoles()
      .subscribe(res => {
        this.roles = res
      });
    ;
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
      });
    
  }
  setRoles() {
    this.userDetail.roles.forEach(rol => {
      this.selectedRol.push(rol);
      let item = this.ngSelect.itemsList.findByLabel(rol.name);
      this.ngSelect.select(item);
    });
  }
  setDataForm() {
    this.formGroup.patchValue({"name": this.userDetail.name})
    this.formGroup.patchValue({"username": this.userDetail.username})
    this.formGroup.patchValue({"email": this.userDetail.email})
    this.formGroup.patchValue({"birthDate": this.userDetail.birthDate})
    this.formGroup.patchValue({"numberPhone": this.userDetail.numberPhone})
    this.formGroup.patchValue({"pictureUser": this.userDetail.pictureUser})
    this.formGroup.patchValue({"idGender": this.userDetail.idGender})
    this.formGroup.patchValue({"idLanguage": this.userDetail.idLanguage})
    this.formGroup.patchValue({"roles": this.userDetail.roles})
  }


  saveData(){
    let update: UserDetail  =   this.formGroup.value;
    update.roles = [];
    
    if (this.ngSelect.selectedValues.length > 0) {
      this.ngSelect.selectedValues.forEach(rol => {
        update.roles.push(rol);
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

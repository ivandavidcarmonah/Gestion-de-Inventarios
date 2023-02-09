import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductDTO } from 'src/app/class/product.interface';
import { RolesDirective } from 'src/app/core/directives/roles.directive';
import { ProductService } from 'src/app/views/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public id: string | null;
  public detail: ProductDTO;
  public formGroup: FormGroup;

  get permit():boolean{
    return this.permisos.checkRoles()
  }

  constructor(private permisos: RolesDirective, private route: ActivatedRoute, 
    private service: ProductService, private router: Router, 
    private formBuilder: FormBuilder) { 
      this.formGroup = this.formBuilder.group({
        name:  ["", Validators.required],
        description:     ["", Validators.required],
        allergies:  ["", Validators.required],
        typeProduct:  [""],
        valid: [""],
        picture:  [""],
        price:  [""],
        preparesin:  [""],
      });
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =   params.get('id');
      if (this.id !== null) {
        this.getById();
      }
    });
  }

  getById() {
    this.service.getById(this.id)
      .subscribe(res  => {
        this.detail = res
        this.setDataForm();
      });
    
  }

  saveData(){
    if(this.formGroup.valid){
      let update: ProductDTO  =   this.formGroup.value;
      this.service.save(update, this.id).subscribe({
        next: (res => {
          this.detail = res
         
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
          this.id = this.detail.idProduct.toString();
          
        },
      });

    }
    
  }

  setDataForm() {
    this.formGroup.patchValue({"name": this.detail.name})
    this.formGroup.patchValue({"description": this.detail.description})
    this.formGroup.patchValue({"price": this.detail.price})
    this.formGroup.patchValue({"allergies": this.detail.allergies})
    this.formGroup.patchValue({"typeProduct": this.detail.typeProduct})
    this.formGroup.patchValue({"valid": this.detail.valid})
    this.formGroup.patchValue({"picture": this.detail.picture})
    this.formGroup.patchValue({"preparesin": this.detail.preparesin})
  }

 
  regresar(){
    this.router.navigate(['products/list-product/']);
  }
}
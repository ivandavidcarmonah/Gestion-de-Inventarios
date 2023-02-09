import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataList, ProductResponseDTO } from 'src/app/class/product.interface';
import { RolesDirective } from 'src/app/core/directives/roles.directive';
import { API_ROUTES } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  img_rute = API_ROUTES.PRODUCT_GET_IMAGEN;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  // ColumnMode = ColumnMode;
  // listUsers: ListUsers = new ListUsers();
  numberPage: any = 0;
  orderBy: string = "id";
  pageSize: number = 5;
  sortDir: string = "desc";
  numbers: number[];
  productResponseDTO: ProductResponseDTO = new ProductResponseDTO();

  constructor(private productService: ProductService, private permisos: RolesDirective, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  get permit():boolean{
    return this.permisos.checkRoles()
  }

  onChange(event: any){
    this.pageSize = event.target.value;
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.numberPage, this.pageSize, this.orderBy, this.sortDir).subscribe(res => {
      this.productResponseDTO = {...res}
      this.numbers = Array(res.totalPages).fill(0).map((x,i)=>i);
    }
    )
  }

  updateItem(item: DataList){
    this.router.navigate(['products/detail-product/'+item.idProduct]);
  }


  deleteItem(item: DataList){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'Esta apunto de eliminar al usuario: ' + item.name +', Esta accion no es reversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.delete(item.idProduct).subscribe({
          next: (res => {
            console.log(res)
          }),
          error: (err => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getProducts();
          }),
          complete: () => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          },
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  changePage(numberPage: number){
    this.numberPage = numberPage
    this.getProducts();
  }


}

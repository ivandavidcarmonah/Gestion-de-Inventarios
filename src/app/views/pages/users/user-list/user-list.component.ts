import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataList, ListUsers } from 'src/app/class/user.interface';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  listUsers: ListUsers = new ListUsers();
  numberPage: any = 0;
  orderBy: string = "id";
  pageSize: number = 5;
  sortDir: string = "desc";
  numbers: number[];

  constructor(private userService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  updateUser(user: DataList){
    this.router.navigate(['users/detail-user/'+user.id]);
  }

  onChange(event: any){
    this.pageSize = event.target.value;
    console.log(this.pageSize)
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsersDatas(this.numberPage, this.pageSize, this.orderBy, this.sortDir).subscribe(res => {
      this.listUsers = {...res}
      this.numberPage = res.numberPage;
      this.pageSize = res.sizePage;
      this.numbers = Array(res.totalPages).fill(0).map((x,i)=>i);

    }
    )
  }

  deleteUser(user: DataList){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'Esta apunto de eliminar al usuario: ' + user.username.toUpperCase() +', Esta accion no es reversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.delete(user.id).subscribe({
          next: (res => {
            console.log(res)
          }),
          error: (err => {
            console.log(err)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getUsers();
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
    this.getUsers();
  }

  

}

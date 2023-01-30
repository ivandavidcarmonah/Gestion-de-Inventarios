import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataList, ListUsers } from 'src/app/class/user.interface';
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

  changePage(numberPage: number){
    this.numberPage = numberPage
    this.getUsers();
  }

  

}

import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ListUsers } from 'src/app/class/user.interface';
import { UsersService } from '../services/users.service';
import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  listUsers: ListUsers = new ListUsers();
  constructor(private userService: UsersService) {
   }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.listUsers = {...res}
      this.listUsers.sizePage = res.sizePage;
      }
    )
  }

  

}

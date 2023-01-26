import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(res => {
      this.listUsers = {...res}
      this.listUsers.sizePage = res.sizePage;

    }
    )
  }

  updateUser(user: DataList){
    console.log(user)
  }

}

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-user',
        pathMatch: 'full'
      },
      {
        path: 'detail-user/:id',
        component: UserDetailComponent
      },
      {
        path: 'insert-user',
        component: UserDetailComponent
      },
      {
        path: 'list-user',
        component: UserListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [UsersComponent, UserDetailComponent, UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule

  ],
  providers:[
    DatePipe
  ]
})
export class UsersModule { }

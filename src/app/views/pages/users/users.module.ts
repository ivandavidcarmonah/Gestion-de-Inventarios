import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
]

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
  ]
})
export class UsersModule { }

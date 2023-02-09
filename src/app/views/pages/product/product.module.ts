import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { RolesDirective } from 'src/app/core/directives/roles.directive';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GetImagen } from 'src/app/pipes/get-files';
import { AngularCropperjsModule } from 'angular-cropperjs';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-product',
        pathMatch: 'full'
      },
      {
        path: 'detail-product/:id',
        component: ProductDetailComponent
      },
      {
        path: 'insert-product',
        component: ProductDetailComponent
      },
      {
        path: 'list-product',
        component: ProductListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    GetImagen,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    TranslateModule,
    AngularCropperjsModule
  ],
  providers:[
    DatePipe,
    RolesDirective,
  ]
})
export class ProductModule { }

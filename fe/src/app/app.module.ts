import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**
 * Metarial
 */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
   MatExpansionModule, MatMenuModule, MatTooltipModule, MatInputModule, MatSelectModule, 
   MatDatepickerModule, MatNativeDateModule } from '@angular/material';
/**
 * Routes
 */
import { Routing } from './routes/routing-app';

/**
 * Component
 */
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages/pages.component';
import { UserMenuComponent } from './component/user-menu/user-menu.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BannerImageComponent } from './component/banner-image/banner-image.component';
import { RoleComponent } from './component/role/role.component';
import { ProductComponent } from './component/product/product.component';
import { PromotionComponent } from './component/promotion/promotion.component';
import { OrderComponent } from './component/order/order.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CategoryComponent } from './component/category/category.component';
import { RoleService } from './service/employee/role.service';
import { EmployeeService } from './service/employee/employee.service';
import { EmployeeListComponent } from './component/employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { FormCreationEmpComponent } from './component/employee/form-creation-emp/form-creation-emp.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { FormCreationCategoryComponent } from './component/category/form-creation-category/form-creation-category.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { FormCreationProductComponent } from './component/product/form-creation-product/form-creation-product.component';
import { PromotionListComponent } from './component/promotion/promotion-list/promotion-list.component';
import { FormCreationPromotionComponent } from './component/promotion/form-creation-promotion/form-creation-promotion.component';



@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    UserMenuComponent,
    UserMenuComponent,
    EmployeeComponent,
    DashboardComponent,
    BannerImageComponent,
    RoleComponent,
    ProductComponent,
    PromotionComponent,
    OrderComponent,
    CustomerComponent,
    CategoryComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    FormCreationEmpComponent,
    CategoryListComponent,
    FormCreationCategoryComponent,
    ProductListComponent,
    FormCreationProductComponent,
    PromotionListComponent,
    FormCreationPromotionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [UserMenuComponent],
  providers: [RoleService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

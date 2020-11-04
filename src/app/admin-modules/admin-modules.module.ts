import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminModulesRoutingModule } from './admin-modules-routing.module';
import { AdminModulesComponent } from './admin-modules.component';
import { HeaderComponent } from './admin-shared/header/header.component';
import { SidebarComponent } from './admin-shared/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { AddProductComponent } from './features/add-product/add-product.component';


@NgModule({
  declarations: [AdminModulesComponent, HeaderComponent, SidebarComponent, DashboardComponent, ProductListComponent, AddProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModulesRoutingModule
  ]
})
export class AdminModulesModule { }

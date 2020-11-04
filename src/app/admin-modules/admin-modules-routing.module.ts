import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteConstant } from '../shared/config/constants/route-constants';
import { AdminModulesComponent } from './admin-modules.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductListComponent } from './features/product-list/product-list.component';

const routes: Routes = [
  {
    path: '', component: AdminModulesComponent,
    children: [
      { path: '', redirectTo: RouteConstant.ROUTE_DASHBOARD, pathMatch: 'full' },
      { path: RouteConstant.ROUTE_DASHBOARD, component: DashboardComponent },
      { path: RouteConstant.ROUTE_PRODUCTS, component: ProductListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModulesRoutingModule { }

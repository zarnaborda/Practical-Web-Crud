import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteConstant } from '../shared/config/constants/route-constants';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: RouteConstant.ROUTE_LOGIN,
    pathMatch: 'full'
  },
  {
    path: RouteConstant.ROUTE_LOGIN,
    component: LoginComponent
  },
  { path: '**', redirectTo: RouteConstant.ROUTE_LOGIN, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RouteConstant } from './shared/config/constants/route-constants';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: RouteConstant.ROUTE_AUTH,
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [AuthGuard],
    data: { state: 'loggedout' }
  },
  {
    path: RouteConstant.ROUTE_ADMIN,
    loadChildren: './admin-modules/admin-modules.module#AdminModulesModule',
    canActivate: [AuthGuard],
    data: { state: 'loggedin' }
  },
  { path: '**', redirectTo: RouteConstant.ROUTE_AUTH, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

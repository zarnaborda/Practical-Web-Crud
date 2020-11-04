import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const pathState = route.data['state'];
    if (pathState === 'loggedin') {
      return this.navigateToLoggedInState();
    } else if (pathState === 'loggedout') {
      return this.navigateToLoggedOutState();
    }
  }

  navigateToLoggedOutState() {
    if (this.authService.accessTokenVal) {
      this.authService.navigateToAdmin();
      return false;
    }
    return true;
  }
  navigateToLoggedInState() {
    if (!this.authService.accessTokenVal) {
      this.authService.navigateToLogin();
      return false;
    }
    return true;
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { RouteConstant } from '../../shared/config/constants/route-constants';
import { StorageConstant } from '../../shared/config/constants/app-constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken;
  private userDetails;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  // Sign in with Google
  GoogleAuth() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.AuthLogin(provider);
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result: any) => {
        let user = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        }
        this.currentUser = { userData: user, token: result.credential.accessToken };
        this.navigateToAdmin();
      }).catch((error) => {
        console.error(error)
      })
  }

  navigateToLogin() {
    this.router.navigate(['/' + RouteConstant.ROUTE_AUTH + '/' + RouteConstant.ROUTE_LOGIN]);
  }

  navigateToAdmin() {
    this.router.navigate(['/' + RouteConstant.ROUTE_ADMIN]);
  }

  set currentUser(userResponse) {
    this.accessToken = userResponse.token;
    this.userDetails = userResponse.userData;
    this.store(StorageConstant.app_token, this.accessToken);
    this.store(StorageConstant.user_details, this.userDetails);
  }

  get currentUser() {
    return this.retrieve(StorageConstant.user_details);
  }

  get accessTokenVal() {
    return this.retrieve(StorageConstant.app_token);
  }

  async clearUserData() {
    await this.afAuth.signOut();
    this.accessToken = null;
    this.userDetails = null;
    this.removeAll();
    this.navigateToLogin();
  }

  public store(key: string, value: Object) {
    let valuePair = JSON.stringify(value);
    localStorage.setItem(key, valuePair);
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public removeAll() {
    localStorage.clear();
  }

  public retrieve(key: string) {
    const data = localStorage.getItem(key);
    let storedToken;
    if (!data) {
      return data;
    } else {
      storedToken = JSON.parse(localStorage.getItem(key));
    }
    return storedToken;
  }
}

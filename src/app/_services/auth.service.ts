import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated = true;
  private _userId = 'xyz';

  get userIsAuthenticated() {
    return this.userAuthenticated
  }
  get userId() {
    return this._userId;
  }

  constructor() { }

  login() {
    this.userAuthenticated = true;
    console.log('authenticated');
  }

  logout() {
    this.userAuthenticated = false;
    console.log('unauthenticated');
  }
}

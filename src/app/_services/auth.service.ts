import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated = true;

  get userIsAuthenticated() {
    return this.userAuthenticated
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

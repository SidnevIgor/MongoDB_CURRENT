import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService{
  constructor() { }
  logIn(response){
    localStorage.setItem('token', response._body);
  }
  logOut(){
    localStorage.removeItem('token');
  }
  isLoggedIn(){
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    if(!token) return false;
    else{
      let isExpired = jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
  }
}

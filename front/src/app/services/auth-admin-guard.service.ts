import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthAdminGuardService implements CanActivate{
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(){
    if(this.auth.isLoggedIn() && this.auth.getUser().isAdmin) return true;
    else{
      this.router.navigate(['**']);
    }
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isLoggedIn()) return true;
    else{
      console.log(state.url);
      this.router.navigate(['/login'],{queryParams: {returnUrl:state.url}});
      return false;
    }
  }
}

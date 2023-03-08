import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const currentUser = this.authService.currentUserValue;
  //   if (currentUser) {
  //     // logged in so return true
  //     return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.authService.logout();
  //   return false;
  // }

  canActivate(): boolean {
    const isValidToken = this.tokenService.isValidToken();

    if (!isValidToken) {
      this.router.navigate(['/login/']);
    //TODO:renew token if possible.
    // this.tokenService.refreshToken()
      return false;
    }
    return true;
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let canActivate = this.auth.userType$.map(
        res => { 
          if ( res == 'admin') return true;
          this.route.navigate(['/']);
          return false;
        }
      )
      return canActivate;

  }
  
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../common/app-user';

@Injectable({
  providedIn: 'root'
})
export class JwtHeaderService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.auth.getUser();
    if ( currentUser == null ) return;
    
    let isLoggedIn = currentUser && currentUser.access_token;
    let isApiUrl = false;

    if ( req.url.startsWith("http://127.0.0.1:5000/refresh")){
      return this.sendRefreshToken(req, next, currentUser);
    }

    for ( let i = 0 ; i < environment.apiUrl.length ; i ++ ){
      if ( req.url.startsWith(environment.apiUrl[i]) ){
        isApiUrl = true;
        break;
      }
    }
    if ( isLoggedIn && isApiUrl ){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
      })
    }

    return next.handle(req);
  }

  sendRefreshToken(req: HttpRequest<any>, next: HttpHandler, currentUser: AppUser){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.refresh_token}`
      }
    })
    return next.handle(req);
  }


}

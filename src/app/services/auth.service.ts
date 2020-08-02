import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppUser } from '../common/app-user';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject$ : BehaviorSubject<AppUser>;
  userObservable$ : Observable<AppUser>;
  userType$;

  constructor( private http: HttpService, private route: Router){ 
    this.userSubject$ = new BehaviorSubject<AppUser>( JSON.parse(localStorage.getItem('currentUser')) );
    this.userObservable$ = this.userSubject$.asObservable();
    this.getUserType();
  }

  authCutsomer(user){
    this.http.login(user).subscribe(( res:AppUser ) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.userSubject$.next(res);
      
      this.route.navigate(['/']);
      this.getUserType();
    })
  }
  authMessenger(messenger){
    this.http.messengerLogin(messenger).subscribe(( res:AppUser ) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.userSubject$.next(res);
      
      this.route.navigate(['/']);
      this.getUserType();
    });
  }
  getUser(){
    return this.userSubject$.value;
  }

  getAuth(){
    return this.getUser().access_token;
  }

  getRefreshToken(){
    return this.getUser().refresh_token;
  }

  askRefreshToken(){
    return this.http.refresh();
  }
  // todo: debug - 2 console.log
  getUserType(){
    this.userType$ = this.http.getUserType().pipe(
      catchError( (err:any) => {
        if ( err.status == 401 )
          {
            return this.askRefreshToken();
          }
        else 
          return of(null)
      }),
      map(
        (res:any) => {
          if ( res == null ) {
            return;
          } 
          if ( res && res.type ){
            return res.type;
          }
          console.log(res)
          let new_access_token = res.access_token
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          currentUser.access_token = new_access_token;

          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.userSubject$.next(currentUser);
        }
      )
    )
  }

  logout(){
      this.http.logout().subscribe( 
        res => {
          this.userSubject$.next(null);
          this.route.navigate(['/login']);
          this.getUserType();
          localStorage.removeItem('currentUser');

        },
        err => console.log(err)
      );
  }

}

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { AppUser } from '../common/app-user';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor( private http: HttpService, private auth: AuthService ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError(
                err => {
                    
                    if ( err.status == 401 ){
                        this.http.refresh().subscribe(
                            (res:any) => {
                                let currentUser: AppUser = JSON.parse(localStorage.getItem('currentUser'));
                                currentUser.access_token = res.access_token; 

                                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                                this.auth.userSubject$.next(currentUser);
                                next.handle(req)
                            }
                        )
                    }

                    return throwError(err)

                }),
        )
        


    }

}

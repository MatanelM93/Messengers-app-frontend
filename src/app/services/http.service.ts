import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user';
import{ environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHello(){
    return this.http.get(this.url);
  }

  getCustomers(){
    return this.http.get(this.url + "customers");
  }

  login(user: User){
    return this.http.post(this.url + "customer/login", {email: user._email, password: user._password });
  }

  messengerLogin(messenger: User){
    return this.http.post(this.url + "store/login", {email: messenger._email, password: messenger._password });
  }

  logout(){
    return this.http.post(this.url + "logout", {});
  }

  register(user: User){
    return this.http.post(this.url + "customer/register", user);
  }
  
  getUserType(){
    return this.http.get(this.url + "type");
  }

  refresh(){
    return this.http.get(this.url + 'refresh');
  }

}

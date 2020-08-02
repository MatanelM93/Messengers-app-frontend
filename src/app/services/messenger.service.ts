import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getOrderMessenger(){
    return this.http.get( this.baseUrl + "info-order");
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { FoodService } from './food.service';
import { Food } from '../common/food';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order = [];
  baseUrl = environment.baseUrl;
  orderSubject$ = new BehaviorSubject<any>(null);
  orderObservable$;
  all_items = [];

  constructor(private http: HttpClient, private food: FoodService) { 
    this.order = JSON.parse(localStorage.getItem('myorder')) || [];
    this.orderObservable$ = this.orderSubject$.asObservable();
    this.setOrderSubject();
  } 

  setOrderSubject(){
    this.food.getAll().subscribe(
      (res:any[]) => {
        let count = {}
        this.order = JSON.parse(localStorage.getItem('myorder')) || [];
        this.order.forEach(val => count[val] = (count[val] || 0) + 1);
        
        this.all_items = res;
        let items = []
        let keys = Object.keys(count);
        for ( let i = 0 ; i < keys.length ; i++ ){
          let id = keys[i];
          let quantity = count[keys[i]];
          let food = this.all_items.filter( x => x.id == id )[0]
          let name = food.name;
          let price = food.price;
          items.push({'id': id, 'name': name, 'quantity': quantity, 'price': price})
        }

        this.orderSubject$.next(items);
      });
  }

  sendOrder(message, token){
    let myorder = JSON.parse(localStorage.getItem('myorder'))
    return this.http.post(this.baseUrl + "order", {"item_ids": myorder, "message": message, "token": token});
  }

  getOrder(){
    return this.orderSubject$.getValue()
  }

  getOrderFromServer(): Observable<any>{
    return this.http.get( this.baseUrl + "order");
  }

  addToOrder(foodItem: Food){
    this.order.push(foodItem.id);
    localStorage.setItem('myorder', JSON.stringify(this.order));

    let items: any[] = this.orderSubject$.getValue() || [];
    let boolean = false;
    for ( let i = 0 ; i < items.length ; i ++ ){
      if ( items[i].id == foodItem.id ) {
        items[i].quantity ++;
        boolean = true;
      }
    }
    if (!boolean) items.push({'id': foodItem.id, 'name': foodItem.name, 'quantity': 1, 'price': foodItem.price});
    this.orderSubject$.next(items);
  }

  deleteFromOrder(id){

    for ( let i = 0 ; i < this.order.length ; i ++ ){
      if ( this.order[i] == id ) {
        this.order.splice(i, 1);
        i--;
      }
    }
    localStorage.setItem('myorder', JSON.stringify(this.order));

    let items: any[] = this.orderSubject$.getValue() || [];
    for ( let i = 0 ; i < items.length ; i ++ ){
      if ( items[i].id == id ) {
        items.splice(i, 1);
        i--;
      }
    }
    
    this.orderSubject$.next(items);
  }

  updateOrder(){
    return this.http.put(this.baseUrl + 'order', {});
  }
  updateStumbledOrder(id){
    return this.http.put(this.baseUrl + 'store/orders', {"id":id})
  }
  deleteOrder(){
    return this.http.delete(this.baseUrl + 'order');
  }
  pickOrder(id){
    return this.http.post(this.baseUrl + "store/orders", {"id": id})
  }
  substractFromOrder(id: number){
    let index = this.order.indexOf(id);
    this.order.splice(index, 1);
    localStorage.setItem('myorder', JSON.stringify(this.order));
    
    let items : any[] = this.orderSubject$.getValue() || [];
    for ( let i = 0 ; i < items.length ; i++ ){
      if ( items[i].id == id ) {
        if( items[i].quantity == 1 ){
          items.splice(i, 1);
        }else{
          items[i].quantity --;
        }
        break;
      }
    }
    this.orderSubject$.next(items);

  }

  getAllOrders(){
    return this.http.get(this.baseUrl + 'orders')
  }

  getMessengerOrders(){
    return this.http.get(this.baseUrl + 'store/orders')
  }

}

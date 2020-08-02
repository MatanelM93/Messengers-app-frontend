import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent{

  items;
  filteredItems;

  price = 0;
  orderItems = [];

  categories = ["chicken", "meat", "fish", "cheese", "oil", "eggs", "vegetables", "nuts", "grain"]
  constructor(private food: FoodService, private order: OrderService) { 
    this.food.getAll().subscribe( items => {
      this.items = items;
      this.filteredItems = items;
    })
    this.orderItems = this.order.getOrder();
    this.order.orderObservable$.subscribe(
      res => {
        this.orderItems = res;
        if ( !res ) return;
        this.price = 0;
        for ( let i = 0 ; i < res.length ; i ++ ){
          this.price += res[i].price * res[i].quantity ;
        }
        this.price = Math.floor(this.price * 100)/100;
      }
    )
  }

  filterByCategory(c){
    
    this.filteredItems = this.items.filter( x => {
      if ( x.category==c ) {
        console.log(x);
        return true;
      }
    });
  }

  removeFromOrder(id){
    this.order.deleteFromOrder(id);
  }

}

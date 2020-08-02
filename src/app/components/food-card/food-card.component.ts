import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Food } from 'src/app/common/food';

@Component({
  selector: 'food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss']
})
export class FoodCardComponent implements OnInit {

  @Input('food') food: Food;

  constructor(private order: OrderService) { 
    
  }

  ngOnInit(): void {

    this.order.orderObservable$.subscribe(
      res => {
        if ( !res ) return ;
        let item = res.filter( x => x.id == this.food.id )[0] || null;
        this.food.quantity = !!item ? item.quantity : 0;
      }
    )
  }

  add(){
    this.food['quantity'] += 1;
    this.order.addToOrder(this.food);

  }
  substract(){
    if ( this.food['quantity'] == 0) return;
    this.food['quantity'] -= 1;
    this.order.substractFromOrder(this.food.id);
  }

}

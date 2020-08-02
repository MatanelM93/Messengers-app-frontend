import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders = [];

  constructor(private order: OrderService, private route: Router) { 
    this.order.getAllOrders().subscribe(
      (res: Array<any>) => {
        this.orders = res;
      })
  }

  pick(id){
    // TODO: navigate to the same page after successful action
    this.order.pickOrder(id).subscribe(
      res => {

        console.log(res)
        this.route.navigate(['/'])
      }
    )
  }

}

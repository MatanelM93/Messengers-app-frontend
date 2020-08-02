import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent {

  picked = [];
  stumbled = [];
  delivered = [];
  currentDelivered : any = {items:[]}
  toggleDelivered;

  constructor(private order: OrderService, private route: Router) { 

    this.order.getMessengerOrders().subscribe(
      (res: Array<any>) =>{
        this.picked = res.filter( x => x['status'] == 'picked') || [];
        this.stumbled = res.filter( x => x['status'] == 'stumbled')|| [];
        this.delivered = res.filter( x => x['status'] == 'delivered')|| [];
      }
      )
      
  }


  update(id){
    this.order.updateStumbledOrder(id).subscribe(
      res => {
        console.log(res)
        this.route.navigate(['/']);
      }
    )
  }
  toggle(id){
    if ( id == this.currentDelivered.id ) {
      this.toggleDelivered = !this.toggleDelivered
      return;
    }
    this.currentDelivered = this.delivered.filter(x=>x['id']==id)[0]; 
    this.toggleDelivered = true;
  }

}

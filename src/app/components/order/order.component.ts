import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FoodService } from 'src/app/services/food.service';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MessengerService } from 'src/app/services/messenger.service';
import { AuthService } from 'src/app/services/auth.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  userItems = [];
  historyItems = [];
  status ;
  orderId ;
  messenger;
  toggleHistory = false;
  toggleCheckout = false;
  itemIds = [];
  orderMessage;

  elements: Elements;
  card: StripeElement;
  stripeTest: FormGroup;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(private order: OrderService, 
    private food: FoodService, 
    private route: Router,
    private messengerService: MessengerService, 
    private auth: AuthService,
    private fb: FormBuilder,
    private stripeService: StripeService) { 

    let sub = this.order.getOrderFromServer().pipe( 

      catchError( err =>{
        if ( err.status != 404 ){
          console.log(err.error.text)
        }
        return of(null)
      }),
      switchMap( (res: any) => {
        if ( res && res.items ) {
          this.userItems = res.items;
          this.status = res.status;
          this.orderId = res.id
          if ( res.status == "picked" || res.status == "stumbled"){
            return this.messengerService.getOrderMessenger();
          }
        }
        return of(null);
      }),
      map(
        res => {
          this.messenger = res;
          if ( this.userItems.length == 0){
            this.userItems = this.order.getOrder();
          }
        }));
    
    let his = this.order.getAllOrders().pipe(
      map ( 
        (res:any) => {
          this.historyItems = res;
        }))
    his.subscribe( )
    sub.subscribe( )
  }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }

  update(){
    this.order.updateOrder().subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

  delete(){
    this.order.deleteOrder().subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
    
  }
  checkoutPopupOpen(message){
    this.toggleCheckout = true;
    this.orderMessage = message;
  }

  buy() {
    const name = this.stripeTest.get('name').value;

    this.stripeService.createToken(this.card, {name}).pipe(
      switchMap(
        res => {
          if (res.token){
            return this.order.sendOrder(this.orderMessage, res.token.id);
          }else{
            return of(null)
          }
        }),
    ).subscribe(
      res => {
        if ( res ){
          console.log(res);
          this.route.navigate(['/'])
        }
      }, err => console.log(err)
    )
  }
}

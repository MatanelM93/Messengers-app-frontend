import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { FoodComponent } from './components/food/food.component';
import { MessengerLoginComponent } from './components/messenger-login/messenger-login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { CustomerGuard } from './guards/customer-guard.guard'
import { MessengerGuard } from './guards/messenger-guard.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'messenger-login', component: MessengerLoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'order', component: OrderComponent, canActivate: [CustomerGuard]},
  {path:'orders', component: OrdersComponent, canActivate: [MessengerGuard]},
  {path:'deliveries', component: DeliveriesComponent, canActivate: [MessengerGuard]},
  {path:'items', component: FoodComponent},
  {path:'email-sent', component: EmailSentComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

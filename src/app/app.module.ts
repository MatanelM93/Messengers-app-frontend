import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Http calls */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { MainNavBarComponent } from './components/main-nav-bar/main-nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';

/* Forms and apperance */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material.module';

/* Services */
import { JwtHeaderService } from './helpers/jwt-header.service';
import { FoodComponent } from './components/food/food.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { MessengerLoginComponent } from './components/messenger-login/messenger-login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { ErrorInterceptor } from './helpers/error.interceptor';

/* Stripe */
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmailSentComponent,
    MainNavBarComponent,
    HomeComponent,
    OrderComponent,
    FoodComponent,
    FoodCardComponent,
    MessengerLoginComponent,
    OrdersComponent,
    DeliveriesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_5bHlvlS5kONOoM8YIY5SjmCP00TIhsUPxk')
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtHeaderService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

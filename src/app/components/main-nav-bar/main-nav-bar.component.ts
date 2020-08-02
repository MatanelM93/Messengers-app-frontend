import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.scss']
})
export class MainNavBarComponent {

  subscription : Subscription; 

  constructor( public auth: AuthService ) { 
  }

  logout(){
    this.auth.logout()
  }

}

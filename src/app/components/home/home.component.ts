import { Component } from '@angular/core';
import { bomb } from 'src/app/animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [bomb]
})
export class HomeComponent {
}

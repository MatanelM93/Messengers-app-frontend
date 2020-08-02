import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-messenger-login',
  templateUrl: './messenger-login.component.html',
  styleUrls: ['./messenger-login.component.scss']
})
export class MessengerLoginComponent {

  form : FormGroup;
  form_error = " ";

  constructor(public auth: AuthService) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  login(){
    let messenger: User = new User( this.email().value, this.password().value);
    this.auth.authMessenger(messenger);
  }


  email(){
    return this.form.get('email');
  }
  getEmailErrorMessage() {
    if (this.email().hasError('required')) {
      return 'You must enter a value';
    }

    return this.email().hasError('email') ? 'Not a valid email' : '';
  }
  password(){
    return this.form.get('password');
  }
  getPasswordErrorMessage() {
    if (this.password().hasError('required')) {
      return 'You must enter a value';
    }
  }

  getFormErrorMessage(){
    return this.form_error;
  }
}

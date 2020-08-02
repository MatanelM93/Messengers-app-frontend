import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  form : FormGroup;
  form_error = " ";

  constructor(public auth: AuthService) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  login(){
    let user: User = new User( this.email().value, this.password().value)
    this.auth.authCutsomer(user);
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

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchedPasswordValidator } from '../../validators/register.validator'
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { fromTop } from 'src/app/animations/animations';
import { Address } from 'src/app/common/address';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fromTop]
})
export class RegisterComponent{

  form: FormGroup;
  form_error = " ";

  constructor(
    private http: HttpService, 
    private route: Router,
    ) { 
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        entrance: new FormControl('',),
        postal: new FormControl('', [Validators.required]),
        floor: new FormControl('',),
        apartment: new FormControl('',)
      }),
      phone_1: new FormControl('', [Validators.required]),
      phone_2: new FormControl('',),
      message: new FormControl('',),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      match_password: new FormControl('', [Validators.required, MatchedPasswordValidator.passwordMustMatch]),
    })
  }


  register(){
    console.log(this.form)
    let address = new Address(
      this.city().value,
      this.street().value,
      this.number().value,
      this.zipCode().value,
      this.entrance().value,
      this.floor().value,
      this.apartment().value
    )
    
    let user = new User(this.email().value, this.password().value, this.firstName().value, this.lastName().value, 
                        this.primaryPhone().value, this.secondaryPhone().value, this.message().value, this.address().value);
    this.http.register(user).subscribe(
      (res:any) => {
        if ( res ){
          localStorage.setItem('email', user._email);
          localStorage.setItem('confirmationLink', res.confirmation_link)
          this.route.navigate(['/email-sent']);
          
        }
      },
      err => {
        this.form_error = err.error.message;
      }
    )
  }
  firstName(){
    return this.form.get('first_name');
  }
  lastName(){
    return this.form.get('last_name');
  }
  address(){
    return this.form.get('address');
  }
  city(){
    return this.form.get('address').get('city');
  }
  street(){
    return this.form.get('address').get('street');
  }
  number(){
    return this.form.get('address').get('number');
  }
  entrance(){
    return this.form.get('address').get('entrance');
  }
  floor(){
    return this.form.get('address').get('floor');
  }
  apartment(){
    return this.form.get('address').get('apartment');
  }
  zipCode(){
    return this.form.get('address').get('postal');
  }
  primaryPhone(){
    return this.form.get('phone_1');
  }
  secondaryPhone(){
    return this.form.get('phone_2');
  }
  message(){
    return this.form.get('message');
  }
  email(){
    return this.form.get('email');
  }
  getDefaultRequiredMessage(){
      return 'You must enter a value';
  }

  getEmailErrorMessage(){
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
  match_password(){
    return this.form.get("match_password");
  }
  getMatchPasswordErrorMessage(){
    if (this.password().hasError('required')) {
      return 'You must enter a value';
    }else if ( this.password().hasError('passwordsNotMatch')){
      return 'Passwords are not matched'
    }
  }

}

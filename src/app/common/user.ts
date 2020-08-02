import { Address } from './address';

export class User{
    constructor(private email: string, private password: string, private first_name?: string, private last_name?: string, 
                private phone_1?: string, private phone_2?:string, private message?: string, private address?: Address){

    }
    get _email(){return this.email;}
    set _email(newEmail: string){this.email = newEmail;}
    get _password(){return this.password;}
    set _password(newPassword: string){this.password = newPassword;}
    get _first_name(): string { return this.first_name;}
    set _first_name(newFirstName: string){ this.first_name = newFirstName;}
    get _last_name(): string { return this.last_name;}
    set _last_name(newLastName: string){ this.last_name = newLastName;}
    get _phone_1(): string{ return this.phone_1;}
    set _phone_1(newPhone: string){this.phone_1 = newPhone;}
    get _phone_2(): string{ return this.phone_2;}
    set _phone_2(newPhone: string){this.phone_2 = newPhone;}
    get _message(): string{return this.message;}
    set _message(newMessage: string){this.message = newMessage;}
    get _address(): Address{return this.address;}
    set _address(newAddress: Address){this.address = newAddress;}

}
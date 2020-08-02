export class Address{
    constructor(private city: string, private street: string, private number: number, private postal: number, 
        private entrance:string, private floor: number, private apartment: number){}

    get _city(): string{return this.city;}
    set _city(newCity: string){this.city = newCity;}
    get _street(): string{ return this.street;}
    set _street(newStreet: string){ this.street = newStreet;}
    get _number(): number { return this.number;}
    set _number(newNumber: number) { this.number = newNumber;}
    get _postal(): number { return this.postal;}
    set _postal(newPostal){ this.postal = newPostal;}
    get _entrance(): string{ return this.entrance;}
    set _entrance(newEntrance: string){this.entrance = newEntrance;}
    get _floor(): number{ return this.number;}
    set _floor(newFloor:number) { this.floor = newFloor;}
    get _apartment(): number { return this.number;}
    set _apartment(newApartment: number){this.apartment = newApartment;}
}
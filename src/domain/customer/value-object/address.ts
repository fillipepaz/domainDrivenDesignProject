//Objeto de Valor
export default class Address {
    _street: string;
    _number: number = -1;
    _zip: string;
    _city: string;
 
    constructor(street: string, number: number, city: string, zip: string){

        this._street = street;
        this._city = city;
        this._number = number;
        this._zip = zip;
        this.validate()
        
    }

    validate(){

        if (this._city.length === 0){
            throw new Error("City is required");
            
        }
        if (this._number === -1){
            throw new Error("Number can't be -1");
            
        }
        if (this._street.length === 0){
            throw new Error("Street is required");
            
        }
        if(this._zip.length === 0){
            throw new Error("Zip is required");
            
        }
    }

    get zip():string{
        return this._zip
    }

    get street():string{
        return this._street
    }

    get number():number{
        return this._number
    }

    get city():string{
        return this._city
    } 
}
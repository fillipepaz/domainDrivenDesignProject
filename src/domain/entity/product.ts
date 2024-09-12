import { validateLocaleAndSetLanguage } from "typescript";

export default class Product {

    private _id: string;
    private _price: number;
    private _name: string

    constructor(id: string, price:number, name: string){
        this._name = name;
        this._id = id;
        this._price = price;
        this.validate()
    }
    private validate():boolean {
        if(this._id.length === 0){
            throw new Error("Id is required");
            
        }
        if(this._price < 0){
            throw new Error("Negative price is not acceptable");
            
        }
        if(this._name.length === 0){
            throw new Error("Name is required");
            
        }

        return true
    }

    public changeName(name:string){
        this._name = name
        this.validate()

    }
    
    public get name() : string {
        return this._name
    }

    changePrice(price:number){
        this._price = price;
        this.validate()
    }

    
    public get price() : number {
        return this._price
    }

    public get id(): string{
        return this._id
    }
    
    

}
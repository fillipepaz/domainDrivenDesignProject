import { isThisTypeNode } from "typescript";

export default class OrderItem {
    private _id: string;
    private _name: string;
    private _productId: string
    private _price: number;
    private _quantity: number

    constructor(id: string, name: string, price:number, quantity:number, productId:string) {
        this._price = price;
        this._name = name;
        this._id = id;
        this._productId = productId;
        this._quantity = quantity
        this.validate()

        
    }
    validate(){
        if(this._price < 0){
            throw new Error("Price can't be negative");
            
        }
        if(this._quantity <= 0){
            throw new Error("Quantity must be greater than 0");
            
        }

        
  
        
    }

    public get price() : number {
        return this._price
    }

    public get quantity():number{
        return this._quantity
    }

    public get id(): string {
        return this._id
    }

    public get productId(): string {
        return this._productId
    }

    public get name(): string {
        return this._name
    }
}
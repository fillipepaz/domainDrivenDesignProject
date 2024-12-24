import OrderItem from "./order_items";

export default class Order {
    _id: string;
    _customerId: string; //diferentes agregados, relação pelo ID e não objeto
    _items: OrderItem[] = [];
    constructor(id: string, customerId: string, orderItens:OrderItem[]) {
        this._customerId = customerId;
        this._id = id;
        this._items = orderItens
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get customerId():string {
        return this._customerId
    }
    validate(): boolean {
        if(this._id.length === 0){
            throw new Error("Id is required");
            
        }
        if(this._customerId.length === 0){
            throw new Error("CostumerId is required");
            
        }
        if(this._items.length === 0){
            throw new Error("Items list must be greater than 0");
            
        }
        if(this._items.some(item => item.quantity <= 0)){
            throw new Error("Quantity must be greater than 0");
            
        }
        return true

    }

    get items(): OrderItem[]{
        return this._items
    }

    total(): number {

        return this._items.reduce((acc,item) => acc + item.price*item.quantity,0)
    }

    
}
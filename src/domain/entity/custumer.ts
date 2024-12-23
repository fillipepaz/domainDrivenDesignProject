// use nomes sugestivos para os métodos. Nomes que se associam às intenções de negócio.
//entidade anemica -> sem regra de negócio
//dto: data transfer object

import EventDispatcher from "../event/@shared/eventDispatcher";
import CustomerChangeAddressEvent from "../event/customer/customerChangeAddressEvent.event";
import CustomerCreatedEvent from "../event/customer/customerCreatedEvent.event";
import CustomerCreatedHandler2 from "../event/customer/handler/enviaConsoleLog1Handler";
import CustomerCreatedHandler1 from "../event/customer/handler/enviaConsoleLog2Handler";
import CustomerChangeAddressHandler from "../event/customer/handler/enviaConsoleLogHandler";
import Address from "./address";

/*
2 entidades: uma focada em negócio e outra focada em persistência.
Value Object não tem um ID
*/
export default class Customer {
    private _id: string;
    private _name: string;
    private _active: boolean = false;
    private _address!: Address;
    private _rewardPoints: number = 0;
    private _eventDispatcher: EventDispatcher
    private _eventHandler1 = new CustomerCreatedHandler1();
    private _eventHandler2 = new CustomerCreatedHandler2();
 

    constructor(id: string, name: string) {
    //os parâmetros do construtor ajudam a garantir a consistência.
    // a entidade precisa ser consistente em todo o ciclo de vida.
    // Uma entidade precisa se autovalidar
    //this._address = address;
    this._id  = id;
    this._name = name;
    this.validate()
    const customerCreatedEvent = new CustomerCreatedEvent({
    name: this._name,
    id: this._id

    })
    this._eventDispatcher = new EventDispatcher();

    this._eventDispatcher.register("customerCreatedEvent", this._eventHandler1);
    this._eventDispatcher.register("customerCreatedEvent", this._eventHandler2); 
    
    this._eventDispatcher.notify(customerCreatedEvent)
    
      
    }

    /*
    get name() : string {
        return this._name 
    }
    get id() : string {
        return this._id 
    }
    get address() : string {
        return this._address 
    }*/

    activate(){
        if(this._address === undefined){
            throw new Error("to activate the client, define an address");
            
        }
        this._active = true;
    }
    
    deactivate(){
        this._active = false;
    }

changeName(name: string){
    this._name = name;
    this.validate();
}    

get rewardPoints():number{
    return this._rewardPoints
}

addRewardPoints(points:number){
    this._rewardPoints+=points
}

validate(){
    //if(this._address === undefined){
    //    throw new Error("Address is required");
    //    
    //}

    if(this._id.length === 0){
        throw new Error("Id is required");
        
    }

    if(this._name.length === 0){
        throw new Error("Name is required");

    }

}

 changeAddress(address: Address){ // todo o objeto é recriado.
    this._address = address
    if (!this._eventDispatcher.getEventHandlers["customerChangeAddressEvent"]){
        const customerChangeAddressHandler = new CustomerChangeAddressHandler()
        this._eventDispatcher.register("customerChangeAddressEvent", customerChangeAddressHandler);
    }
    const custumerChangeAddressEvent = new CustomerChangeAddressEvent(
        {address: this.Address,
            id: this._id,
            name: this._name
        }
    )
    this._eventDispatcher.notify(custumerChangeAddressEvent)
}


public get name() : string {
    return this._name
}

public isActive(){
    if (this._active === true){
        return true
    } else {
        return false
    }
}
public get id() : string{
    return this._id

}

public get Address(){
    return this._address
}

    
}

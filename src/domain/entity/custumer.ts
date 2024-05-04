// use nomes sugestivos para os métodos. Nomes que se associam às intenções de negócio.
//entidade anemica -> sem regra de negócio
//dto: data transfer object

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

    constructor(id: string, name: string) {
    //os parâmetros do construtor ajudam a garantir a consistência.
    // a entidade precisa ser consistente em todo o ciclo de vida.
    // Uma entidade precisa se autovalidar
    //this._address = address;
    this._id  = id;
    this._name = name;
    this.validate()      
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

set Address(address: Address){ // todo o objeto é recriado.
    this._address = address
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

    
}

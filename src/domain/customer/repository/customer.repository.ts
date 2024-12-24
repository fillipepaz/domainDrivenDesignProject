

import CustomerModel from "../../../infrastructure/database/sequelize/model/customer/customer.model";
import Customer from "../entity/custumer";
import Address from "../value-object/address";
import CustomerRepositoryInterface from "./customer-repository.interface";


export default class CustomerRepository implements CustomerRepositoryInterface{

    async create(entity: Customer):Promise<void>{
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            zip: entity.Address.zip,
            city: entity.Address.city,
            street: entity.Address.street,
            rewardPoints: entity.rewardPoints,
            number: entity.Address.number,
            active: entity.isActive()
        })
    }
   async  update(entity: Customer):Promise<void>{

    await CustomerModel.update({
       
            name: entity.name,
            zip: entity.Address.zip,
            city: entity.Address.city,
            street: entity.Address.street,
            number: entity.Address.number,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive()
    },{
    where: {
        id: entity.id,
    }})

    }
    async find(id: string):Promise<Customer>{
        const customerModel = await CustomerModel.findOne({where: {id: "1"}})
    /*try {
      customerModel = await CustomerModel.findOne({
        where: {
          id:id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }*/
    console.log(customerModel.id, customerModel.number, customerModel.name)

    const customer = new Customer(customerModel.id, customerModel.name)
    
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    );
    customer.changeAddress(address);
    if (customerModel.active === true){
        customer.activate()
    }
    return customer;
    
        

    }
    async findAll():Promise<Customer[]>{

        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {

            
            let customer = new Customer(customerModel.id, customerModel.name)
            let address = new Address(customerModel.street, customerModel.number, customerModel.city,customerModel.zip, )
            customer.addRewardPoints(customerModel.rewardPoints)
            customer.changeAddress(address)
            if (customerModel.active === true){
                customer.activate()
            }

            return customer
            
        })
    }

}
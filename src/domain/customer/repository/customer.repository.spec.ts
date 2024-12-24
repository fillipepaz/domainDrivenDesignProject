import {Sequelize} from 'sequelize-typescript';
import Address from '../value-object/address';

import CustomerModel from '../../../infrastructure/database/sequelize/model/customer.model';
import ProductModel from '../../../infrastructure/database/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import Customer from '../entity/custumer';


describe("Customer Repository Test", () => {
    let sequelize:Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true },
        });
        sequelize.addModels([CustomerModel,ProductModel]);
        await sequelize.sync();
    });

    
    afterEach(async() => {
        await sequelize.close()
    });

    it("should create a Customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("cl1", "joao");
        const address = new Address("sr bonfim", 40, "Alag", "45545454")
        customer.changeAddress(address)
        customer.addRewardPoints(50)
        customer.activate()

        
        await customerRepository.create(customer)
        const customerModel = await CustomerModel.findOne({where: {id: "cl1"}})
        expect(customerModel.toJSON()).toStrictEqual({
            "id":"cl1",
            "city":"Alag",
            "zip":"45545454",
            "number":40,
            "street":"sr bonfim",
            "rewardPoints":50,
            "name":"joao",
            "active": true,
        })

    })

    it("should change a Customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("cl1", "joao");
        const address = new Address("sr bonfim", 40, "Alag", "45545454")
        customer.changeAddress(address)
        customer.addRewardPoints(50)
        customer.activate()
        await customerRepository.create(customer)
        const customerModel = await CustomerModel.findOne({where: {id: "cl1"}})
        expect(customerModel.toJSON()).toStrictEqual({
            "id":"cl1",
            "city":"Alag",
            "zip":"45545454",
            "number":40,
            "street":"sr bonfim",
            "rewardPoints":50,
            "name":"joao",
            "active": true,
        })
        customer.changeName("Alopra")
        customer.addRewardPoints(100)
        
        CustomerModel.update({
       
            name: customer.name,
            rewardPoints: customer.rewardPoints
        },{
        where: {
            id: customer.id,
        }})

        const customerModel2 = await CustomerModel.findOne({where: {id: "cl1"}})
        expect(customerModel2.toJSON()).toStrictEqual({
            "id":"cl1",
            "city":"Alag",
            "zip":"45545454",
            "number":40,
            "street":"sr bonfim",
            "rewardPoints":150,
            "name":"Alopra",
            "active": true,
        })

    })

  /*  it("should get all products", async() => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", 10, "Prod1");
        await productRepository.create(product1)
        const product2 = new Product("2", 20, "Prod2");
        await productRepository.create(product2)
        const founded = await productRepository.findAll()
        expect([product1, product2]).toEqual(founded)


    })*/

    it("should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "joao");
        const address = new Address("sr bonfim", 40, "Alag", "45545454")
        customer.changeAddress(address)
        customer.addRewardPoints(50)
        customer.activate()
        await customerRepository.create(customer)
        //const customerFound = await customerRepository.find("1")
        const customerModel = await CustomerModel.findOne({where: {id: "1"}})
        expect(customerModel.toJSON()).toStrictEqual({
            "id":"1",
            "city":"Alag",
            "zip":"45545454",
            "number":40,
            "street":"sr bonfim",
            "rewardPoints":50,
            "name":"joao",
            "active": true,
        })

        const customerFound = await customerRepository.find("1")
        
        
        

    })

});
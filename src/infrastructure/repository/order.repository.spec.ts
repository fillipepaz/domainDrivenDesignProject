import { where } from 'sequelize';
import {Sequelize} from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/custumer';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_items';
import Product from '../../domain/entity/product';
import CustomerModel from '../database/sequelize/model/customer.model';
import OrderItemModel from '../database/sequelize/model/order-item.model';
import OrderModel from '../database/sequelize/model/order.model';
import ProductModel from '../database/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import OrderRepository from './order.repository';
import ProductRepository from './product.repository';


describe("Order Repository Test", () => {
    let sequelize:Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true },
        });
        sequelize.addModels([CustomerModel,ProductModel, OrderModel, OrderItemModel]);
        await sequelize.sync();
    });

    
    afterEach(async() => {
        await sequelize.close()
    });
    
    it("Should get all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Joao")
        const address = new Address("Street",40,"myCity","4080100")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123",10, "Product 1");
        await productRepository.create(product);
        const product2 = new Product("122",20, "Product 2");
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("1", product.name, product.price, 2, product.id)
        const orderItem2 = new OrderItem("2", product2.name, product2.price, 4, product2.id)

        const order1 = new Order("123","123", [orderItem1]) 
        const order2 = new Order("124","123", [orderItem2])
       
        
        const orderRepository = new OrderRepository()
        await orderRepository.create(order1) 
        await orderRepository.create(order2) 
        const orders = [order1, order2]
        const allOrders = await orderRepository.findAll();
        expect(orders).toEqual(allOrders);
       

     
        

        
    })

    it("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Joao")
        const address = new Address("Street",40,"myCity","4080100")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123",10, "Product 1");
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.name, product.price, 2, product.id)
        

        const order1 = new Order("123","123", [orderItem1])
       
        
        const orderRepository = new OrderRepository()
        await orderRepository.create(order1) 
        
        const findedObjBeforeChange = await orderRepository.find(order1.id)
        expect(findedObjBeforeChange).toEqual(findedObjBeforeChange)
        //make changes
        const product2 = new Product("122",20, "Product 2");
        await productRepository.create(product2);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, 4, product2.id)
        const order2 = new Order("123","123", [orderItem1, orderItem2])
        await orderRepository.update(order2);
        const findedObjAfterChange = await orderRepository.find(order2.id)
        console.log(findedObjAfterChange)
        expect(findedObjAfterChange).toEqual(order2)

     
        

        
    })

    it("Should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Joao")
        const address = new Address("Street",40,"myCity","4080100")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123",10, "Product 1");
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id)

        const order = new Order("123","123", [orderItem])
        
        const orderRepository = new OrderRepository()
        await orderRepository.create(order) 
        const find = await OrderModel.findOne({where: {id: order.id},
            include: ["items"]
        
        });
        const findedObj = await orderRepository.find(order.id)
        expect(find.toJSON()).toStrictEqual({
            id: findedObj.id,
            customer_id: findedObj.customerId,
            total: findedObj.total(),
            items: [
                {
                    id: findedObj.items[0].id,
                    name: findedObj.items[0].name,
                    price: findedObj.items[0].price,
                    quantity: findedObj.items[0].quantity,
                    order_id: findedObj.id,
                    product_id: findedObj.items[0].productId
                }
            ]
        })
        expect(order).toEqual(findedObj)
    })

    it("Should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Joao")
        const address = new Address("Street",40,"myCity","4080100")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123",10, "Product 1");
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id)

        const order = new Order("123","123", [orderItem])
        
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const find = await OrderModel.findOne({where: {id: order.id},
            include: ["items"]
        
        });

        expect(find.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123"
                }
            ]
        })


    });
    

});
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

        const orderModel = await OrderModel.findOne({where: {id: order.id},
            include: ["items"]
        
        });

        expect(orderModel.toJSON()).toStrictEqual({
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
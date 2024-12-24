import {Sequelize} from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/database/sequelize/model/product/product.model';

import Product from '../entity/product';

import ProductRepository from './product.repository';

describe("Product Repository Test", () => {
    let sequelize:Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    
    afterEach(async() => {
        await sequelize.close()
    });

    it("should create a product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10, "Prod1");
        await productRepository.create(product)
        const productModel = await ProductModel.findOne({where: {id: 1}})
        expect(productModel.toJSON()).toStrictEqual({
            "id":"1",
            "price":10,
            "name":"Prod1",
        })

    })

    it("should change a product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10, "Prod1");
        await productRepository.create(product)
        const productModel = await ProductModel.findOne({where: {id: 1}})
        expect(productModel.toJSON()).toStrictEqual({
            "id":"1",
            "price":10,
            "name":"Prod1",
        })
        product.changeName("ProdXPTO")
        product.changePrice(50)
        
        ProductModel.update({
       
            name: product.name,
            price: product.price
        },{
        where: {
            id: product.id,
        }})

        const productModel2 = await ProductModel.findOne({where: {id: 1}})
        expect(productModel2.toJSON()).toStrictEqual({
            "id":"1",
            "price":50,
            "name":"ProdXPTO",
        })

    })

    it("should get all products", async() => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", 10, "Prod1");
        await productRepository.create(product1)
        const product2 = new Product("2", 20, "Prod2");
        await productRepository.create(product2)
        const founded = await productRepository.findAll()
        expect([product1, product2]).toEqual(founded)


    })

    it("should find a product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10, "Prod1");
        await productRepository.create(product)
        const productFound = await productRepository.find("1")
        const productModel = await ProductModel.findOne({where: {id: "1"}})
        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price


        })

        expect(product).toEqual(productFound)
        
        
        

    })

});
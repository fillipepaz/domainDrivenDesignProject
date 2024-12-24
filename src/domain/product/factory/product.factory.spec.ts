import ProductFactory from "./product.factory"

describe("Product factory unit test", () => {

    it("Should create a product of kind A", ()=>{
        const product = ProductFactory.create("firstOp", "Product test", 10)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product test")
        expect(product.price).toBe(10)
        expect(product.constructor.name).toBe("Product")

    });

    it("Should create a product of kind B", ()=>{
        const product = ProductFactory.create("secondOp", "Product test", 10)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product test")
        expect(product.price).toBe(50)
        expect(product.constructor.name).toBe("ProductB")

    });

    it("Should throw an error", ()=>{
        expect(() => ProductFactory.create("secondOp2", "Product test", 10)).toThrow("Product type not supported") 
        

    });
})
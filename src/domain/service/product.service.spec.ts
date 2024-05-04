import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    

it("should change the price of all products", () => {

    const product1 = new Product("prod1", 10,"Product 1")
    const product2 = new Product("prod2", 20,"Product 2")
    const products = [product1, product2]

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
    


});
});
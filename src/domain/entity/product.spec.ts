import Product from "./product";



describe("Product unit tests", () => {

it("should throw error when id is empty", () => {
    expect(() =>{ 
        let product = new Product("",200,"Product 1");

}).toThrow("Id is required")
});

it("should throw error when name is empty", () => {
    expect(() =>{ 
        let product = new Product("12",200,"");

}).toThrow("Name is required")
});
it("should throw error when price is negative", () => {
    expect(() =>{ 
        let product = new Product("12",-10,"product 1");

}).toThrow("Negative price is not acceptable")

});

it("should change product name", () => {
    const product1 = new Product("12", 10, "ProdB")
    product1.changeName("ProdC")
    expect(product1.name).toBe("ProdC")

});

it("should change product price", () => {
    const product1 = new Product("12", 10, "ProdB")
    product1.changePrice(50)
    expect(product1.price).toBe(50)

});


});
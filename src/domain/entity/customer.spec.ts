import Address from "./address";
import Customer from "./custumer";

describe("Customer unit tests", () => {

it("should throw error when id is empty", () => {
    expect(() =>{ 
        let customer = new Customer("","test");

}).toThrow("Id is required")
});

it("should throw error when name is empty", () => {
    expect(() =>{ 
        let customer = new Customer("123","");

}).toThrow("Name is required")
});

it("should change name", () => {
   
        //Arrange
        const customer = new Customer("123","John");
        //Act
        customer.changeName("Ana");
        
        //Assert
        expect(customer.name).toBe("Ana")
});

it ("should activate a client", () => {

    const customer = new Customer("1", "John");
    const address = new Address("rua a", 45, "alag", "45844555554")
    customer.changeAddress(address) 
    customer.activate()

    expect(customer.isActive()).toBe(true)
});

it ("should deactivate a client", () => {

    const customer = new Customer("1", "John");
    
    customer.deactivate()

    expect(customer.isActive()).toBe(false)
});

it ("should add reward points", () => {

    const customer = new Customer("1", "John");
    
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)

    
});

it ("should throw an error when client address is undefined", () => {

    expect(() =>{
    const customer = new Customer("1", "John");
    customer.activate()
}).toThrow("to activate the client, define an address")

});

});
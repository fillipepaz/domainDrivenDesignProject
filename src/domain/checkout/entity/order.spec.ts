import Customer from "../../customer/entity/custumer";
import OrderService from "../service/order.service";

import Order from "./order";
import OrderItem from "./order_items";


describe("Order unit tests", () => {

it("should throw error when id is empty", () => {
    expect(() =>{ 
        let order = new Order("","10",[]);

}).toThrow("Id is required")
});

it("should throw error when CostumerId is empty", () => {
    expect(() =>{ 
        let order = new Order("10","",[]);

}).toThrow("CostumerId is required")
});


it("should throw error when Items is empty", () => {
    expect(() =>{ 
        let order = new Order("10","123",[]);

}).toThrow("Items list must be greater than 0")
});

it("should calculate total", () => {
    
    const item1 = new OrderItem("10", "melancia", 10, 2, "p1")
    const item2 = new OrderItem("11", "melao", 20, 3, "p2")
    const order = new Order("20", "10",[item1, item2])
    expect(order.total()).toBe(80)

    const order2 = new Order("25", "10",[item1])
    expect(order2.total()).toBe(20)
})

it("should throw error when Items price is less or equal than 0", () => {
    expect(() =>{
        const item1 = new OrderItem("10","ProbS",-10,5, "10") 
        const order = new Order("10","123",[item1]);

}).toThrow("Price can't be negative")
});

it("should throw error when Items quantity is less or equal than 0", () => {
    expect(() =>{
        const item1 = new OrderItem("10","ProbS",10,-5, "10") 
        const order = new Order("10","123",[item1]);

}).toThrow("Quantity must be greater than 0")
});

it("should place a order", () => {
  
        const item1 = new OrderItem("10","ProbS",10,1,"p1") 
        const customer = new Customer("c1", "joao")
        const order = OrderService.placeOrder(customer,[item1])
        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)

        const item2 = new OrderItem("10","ProbS",20,1,"p2")
        const order2 = OrderService.placeOrder(customer,[item2])
        expect(customer.rewardPoints).toBe(15)
        expect(order2.total()).toBe(20)


});

});
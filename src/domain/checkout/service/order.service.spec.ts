

import Order from "../entity/order"
import OrderItem from "../entity/order_items"
import OrderService from "./order.service"

describe("Order Service unit tests", () => {
    it("should get total of all orders", () => {
      const orderItem1 = new OrderItem("i1", "item1", 100, 3, "p1")
      const orderItem2 = new OrderItem("i2", "item2", 50, 2, "p1")
      const order1 = new Order("o1", "10", [orderItem1])
      const order2 = new Order("o2", "10", [ orderItem2])
      const total = OrderService.total([order1, order2])
    expect(total).toBe(400)
    })
})
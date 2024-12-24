import {v4 as uuid} from "uuid"
import OrderFactory from "./order.factory"

describe("Product factory unit test", () => {

    it("Should create a order", ()=>{ 

        const orderProps = {
            customerId: uuid(),
            items: [
                {
                    name: "Product A",
                    productId: uuid(),
                    quantity: 1,
                    price: 100
                },
                {
                    name: "Product B",
                    productId: uuid(),
                    quantity: 2,
                    price: 200
                }
            ]
        }

        const order = OrderFactory.create(orderProps)
        expect(order.items.length).toBe(2)
        expect(order.customerId).toBe(orderProps.customerId)


    })
})

import OrderItem from "../entity/order_items";
import {v4 as uuid} from "uuid"

import Order from "../entity/order";

interface OrderFactoryProps {
    customerId: string;
    items: {
        name: string,
        productId: string,
        quantity: number,
        price: number
    }[];
}
export default class OrderFactory {
    public static create(properties: OrderFactoryProps): Order{

        const items = properties.items.map((item) => {
            return new OrderItem(
                uuid(), item.name, item.price, item.quantity, item.productId)
            
            }    
            );
        
    return new Order(uuid(), properties.customerId, items)
        }
}
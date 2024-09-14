
import Order from "../../domain/entity/order"
import OrderModel from "../database/sequelize/model/order.model";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderRepositoryInterface from "./order-repository.interface";
import OrderItem from "../../domain/entity/order_items";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      })),
    },
    {
      include: [{model: OrderItemModel}],

    }
    );
}
async update(entity: Order): Promise<void> {
    
  await OrderModel.update({
    id: entity.id,
    customer_id: entity.customerId,
    total: entity.total(),
    items: entity.items
     /*entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity
    })),*/
    
  },
  
  {
    
    where: {
      id: entity.id,
    
  }
    

  },
  
  );
  

}
async find(id: string): Promise<Order> {
  const orderModel  = await OrderModel.findOne({where: {id: id},
    include: ["items"]

});

let itens =  orderModel.items.map((item) => {
    let orderItem = new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
    return orderItem
  })
  return new Order(orderModel.id, orderModel.customer_id, itens)
}

async findAll(): Promise<Order[]> {
  const orderModels = await OrderModel.findAll({
    include: ["items"],
  });

  return orderModels.map((orderI) => {
    const itens = orderI.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id);
    });

    return new Order(orderI.id, orderI.customer_id, itens);
  });
}


}


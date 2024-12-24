
import OrderItemModel from "../../../infrastructure/database/sequelize/model/order-item.model";
import OrderModel from "../../../infrastructure/database/sequelize/model/order.model";
import Order from "../entity/order";

import OrderItem from "../entity/order_items";
import OrderRepositoryInterface from "./order-repository.interface";




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
    
  const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  //})
  
  /*await OrderModel.update({
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
    //entity.items
     /*entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity
    })),
    
  },
  
  {
    
    where: {
      id: entity.id,
    
  }
    

  },
  
  );*/
  

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

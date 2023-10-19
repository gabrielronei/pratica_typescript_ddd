import Customer from "../../domain/entity/customer"
import Order from "../../domain/entity/oder"
import OrderItem from "../../domain/entity/order_item"
import {v4 as uuid} from "uuid"

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) throw new Error("Order must have at least one item");

        const order = new Order(uuid(), customer.id, items);

        customer.addRewardPoints(order.total());


        return order;
    }
}
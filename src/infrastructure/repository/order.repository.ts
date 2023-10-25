import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-items_model";
import OrderModel from "../db/sequelize/model/order.model";

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
                include: [{ model: OrderItemModel }],
            });
    }


    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;

        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });

            const newItems = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }));

            await OrderItemModel.bulkCreate(newItems, { transaction: t });

            await OrderModel.update({
                customer_id: entity.customerId,
                total: entity.total(),
            },
                {
                    where: {
                        id: entity.id,
                    },
                    transaction: t
                }
            )
        })
    }

    async find(id: string): Promise<Order> {
        try {
            const order = await OrderModel.findOne({ where: { id: id }, include: [{ model: OrderItemModel }], rejectOnEmpty: true });
            return new Order(order.id, order.customer_id, order.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)));
        } catch (error) {
            throw new Error("Order not found!");
        }
    }

    async findAll(): Promise<Order[]> {
        return (await OrderModel.findAll({ include: ['items'] })).map(order => new Order(order.id, order.customer_id, order.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))));
    }
}
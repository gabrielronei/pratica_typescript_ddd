import Order from "../../domain/entity/oder";
import OrderItemModel from "../db/sequelize/model/order-items_model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {

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


    // async update(entity: Customer): Promise<void> {
    //     await CustomerModel.update({
    //         name: entity.name,
    //         street: entity.street,
    //         number: entity.number,
    //         zipcode: entity.zip,
    //         city: entity.city,
    //         active: entity.isActive(),
    //         rewardPoints: entity.rewardPoints,
    //     },
    //         {
    //             where: {
    //                 id: entity.id
    //             }
    //         }
    //     );
    // }

    // async find(id: string): Promise<Customer> {
    //     try {
    //         const customer = await CustomerModel.findOne({where: {id: id}, rejectOnEmpty: true});
    //         return new Customer(customer.id, customer.name, new Address(customer.street, customer.number, customer.zipcode, customer.city));
    //     } catch(error) {
    //         throw new Error("Customer not found!");
    //     }
    // }

    // async findAll(): Promise<Customer[]> {
    //     return (await CustomerModel.findAll()).map(customer => new Customer(customer.id, customer.name, new Address(customer.street, customer.number, customer.zipcode, customer.city)));
    // }

}
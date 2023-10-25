import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import Order from "../../../domain/entity/oder";
import OrderItem from "../../../domain/entity/order_item";
import Product from "../../../domain/entity/product";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import OrderItemModel from "../../../infrastructure/db/sequelize/model/order-items_model";
import OrderModel from "../../../infrastructure/db/sequelize/model/order.model";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import OrderRepository from "../../../infrastructure/repository/order.repository";
import ProductRepository from "../../../infrastructure/repository/product.repository";

describe("Order repository test", () => {

    let sequelize: Sequelize;


    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    it("should return true", async() => {
        expect(true).toBe(true);
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("512232", "Customer 512232", new Address("rua dos maluquinhos", 10, "11111111", "São Paulo"));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("101012", "Product 101012", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("132123", product.name, product.price, product.id, 2);

        const order = new Order("222", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id
                },
            ],
        });
    });


    afterEach(async () => {
        await sequelize.close();
    });

});
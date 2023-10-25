import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import Order from "../../../domain/entity/order";
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

    it("should return true", async () => {
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

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("512232", "Customer 512232", new Address("rua dos maluquinhos", 10, "11111111", "São Paulo"));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("101012", "Product 101012", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("132123", product.name, product.price, product.id, 2);

        let order = new Order("222", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const anotherItem = new OrderItem("132124", "produto legal", 10, product.id, 6);

        order = new Order(order.id, customer.id, [orderItem, anotherItem]);

        await orderRepository.update(order);
        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.items).toHaveLength(2);
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [{
                id: '132123',
                name: 'Product 101012',
                price: 10,
                order_id: order.id,
                product_id: '101012',
                quantity: 2
              },
              {
                id: '132124',
                name: 'produto legal',
                price: 10,
                order_id: order.id,
                product_id: '101012',
                quantity: 6
              }
            ],

        });
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("4321", "Customer 4321", new Address("rua dos maluquinhos", 10, "11111111", "São Paulo"));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("54321", "Product 54321", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("12345", product.name, product.price, product.id, 2);

        const order = new Order("888", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        const foundOrder = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            items: foundOrder.items.map(item =>
            ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                order_id: foundOrder.id,
                product_id: item.productId
            })
            ),
        });
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("4321", "Customer 4321", new Address("rua dos maluquinhos", 10, "11111111", "São Paulo"));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("54321", "Product 54321", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("12345", product.name, product.price, product.id, 2);

        const order = new Order("888", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        await customerRepository.create(new Customer("5123", "Customer 5123", new Address("Rua bem legal", 10, "22222222", "Bahia")));

        const anotherProduct = new Product("76543", "Product 76543", 10);
        await productRepository.create(anotherProduct);

        const anotherOrderItem = new OrderItem("54321", product.name, product.price, product.id, 2);

        const anotherOrder = new Order("333", customer.id, [anotherOrderItem]);

        await orderRepository.create(anotherOrder);
        const foundOrders = await orderRepository.findAll();

        expect([order, anotherOrder]).toHaveLength(2);
        expect([order, anotherOrder]).toEqual(foundOrders);
    });


    afterEach(async () => {
        await sequelize.close();
    });

});
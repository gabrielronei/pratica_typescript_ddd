import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../infrastructure/repository/customer.repository";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";

describe("Customer repository test", () => {

    let sequelize: Sequelize;


    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'memory',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("rua dos bobos", 0, "12345601", "São paulo");
        const customer = new Customer("1", "Gabriel", address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: customer.id}});
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.street,
            number: customer.number,
            zipcode: customer.zip,
            city: customer.city,
        })
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("rua dos bobos", 0, "12345601", "São paulo");
        const customer = new Customer("1", "Gabriel", address);
        
        await customerRepository.create(customer);


        const customerModel = await CustomerModel.findOne({where: {id: customer.id}})

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.street,
            number: customer.number,
            zipcode: customer.zip,
            city: customer.city,
        });

        customer.changeName("Joãozinho");
        customer.addRewardPoints(1000);
        customer.activate();

        await customerRepository.update(customer);

        const anotherCustomerModel = await CustomerModel.findOne({ where: {id: customer.id }});

        expect(anotherCustomerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.street,
            number: customer.number,
            zipcode: customer.zip,
            city: customer.city,
        });

    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("rua dos bobos", 0, "12345601", "São paulo");
        const customer = new Customer("1", "Gabriel", address);
        
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: customer.id}});
        const foundCustomer = await customerRepository.find(customer.id);

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            active: foundCustomer.isActive(),
            rewardPoints: foundCustomer.rewardPoints,
            street: foundCustomer.street,
            number: foundCustomer.number,
            zipcode: foundCustomer.zip,
            city: foundCustomer.city,
        });
    });

    it("should findAll customers", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("rua dos bobos", 0, "12345601", "São paulo");
        const customer = new Customer("1", "Gabriel", address);

        const addressTwo = new Address("outra rua", 10, "01765432", "São paulo");
        const customerTwo = new Customer("2", "GenG", addressTwo);

        await customerRepository.create(customer);
        await customerRepository.create(customerTwo);

        const customers = [customer, customerTwo];
        const foundCustomers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toEqual(foundCustomers);
    });


    it("should throw an error when a customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => (await customerRepository.find("123456"))).rejects.toThrow("Customer not found!");
    });


    afterEach(async () => {
        await sequelize.close();
    });

});
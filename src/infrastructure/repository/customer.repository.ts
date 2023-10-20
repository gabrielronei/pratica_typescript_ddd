import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.street,
            number: entity.number,
            zipcode: entity.zip,
            city: entity.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.street,
            number: entity.number,
            zipcode: entity.zip,
            city: entity.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

    async find(id: string): Promise<Customer> {
        try {
            const customer = await CustomerModel.findOne({where: {id: id}, rejectOnEmpty: true});
            return new Customer(customer.id, customer.name, new Address(customer.street, customer.number, customer.zipcode, customer.city));
        } catch(error) {
            throw new Error("Customer not found!");
        }
    }

    async findAll(): Promise<Customer[]> {
        return (await CustomerModel.findAll()).map(customer => new Customer(customer.id, customer.name, new Address(customer.street, customer.number, customer.zipcode, customer.city)));
    }

}
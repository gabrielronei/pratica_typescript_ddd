import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";

describe("Customer unit tests", () => {

    it("it should throw error when id is empty", () => {
        expect(() => new Customer("", "Gabriel", new Address("xpto", 78, "11111111", "rua dos bobos"))).toThrowError("id is required");
    });

    it("it should throw error when name is empty", () => {
        expect(() => new Customer("123", "", new Address("xpto", 78, "11111111", "rua dos bobos"))).toThrowError("name is required");
    });

    it("it should change name", () => {
        const customer = new Customer("123", "Gabriel", new Address("xpto", 78, "11111111", "rua dos bobos"));

        customer.changeName("João");

        expect(customer.name).toBe("João");
    });

    it("it should validate name", () => {
        const customer = new Customer("123", "Gabriel", new Address("xpto", 78, "11111111", "rua dos bobos"));

        expect(() => customer.changeName("")).toThrowError("name is required");
    });

    it("it should activate customer", () => {
        const customer = new Customer("123", "Gabriel", new Address("xpto", 78, "11111111", "rua dos bobos"));

        expect(customer.isActive()).toBe(false);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

});
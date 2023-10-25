import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";

describe("Order unit tests", () => {

    it("it should throw error when id is empty", () => {
        expect(() => new Order("", "321", [new OrderItem("123", "xpto", 10, "1", 1)])).toThrowError("id is required");
    });

    it("it should throw error when name is empty", () => {
        expect(() => new Order("12", "", [new OrderItem("123", "xpto", 10, "1", 1)])).toThrowError("customerId is required");
    });

    it("it should throw error when name is empty", () => {
        expect(() => new Order("12", "321", [])).toThrowError("at least 1 item is required");
    });

    it("it should sum the total value of the items", () => {
        let order = new Order("12", "321", [new OrderItem("123", "xpto", 0, "1", 1)]);

        expect(order.total()).toBe(0);

        order = new Order("12", "321", [new OrderItem("123", "xpto", 10, "1", 1), new OrderItem("1234", "xpto 2.0", 321, "1", 1)]);

        expect(order.total()).toBe(331);
    });

});
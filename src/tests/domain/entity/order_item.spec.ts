import OrderItem from "../../../domain/entity/order_item";

describe("Order_Item unit tests", () => {

    it("it should throw error when id is empty", () => {
        expect(() => new OrderItem("", "item legal", 0, "1", 1)).toThrowError("id is required");
    });

    it("it should throw error when name is empty", () => {
        expect(() => new OrderItem("123", "", 0, "1", 1)).toThrowError("name is required");
    });

    it("it should throw error when total is not negative", () => {
        expect(() => new OrderItem("123", "item legal", -1, "1", 1)).toThrowError("price should not be negative");
        expect(() => new OrderItem("123", "item legal", -2, "1", 1)).toThrowError("price should not be negative");
        expect(() => new OrderItem("123", "item legal", 0, "1", 1)).not.toThrowError("price should not be negative");
        expect(() => new OrderItem("123", "item legal", 1, "1", 1)).not.toThrowError("price should not be negative");
    });

});
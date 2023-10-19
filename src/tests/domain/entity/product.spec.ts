import Product from "../../..//domain/entity/product";
import OrderItem from "../../../domain/entity/product";

describe("Product unit tests", () => {

    it("it should throw error when id is empty", () => {
        expect(() => new Product("", "produtao show", 10)).toThrowError("id is required");
    });

    it("it should throw error when name is empty", () => {
        expect(() => new Product("1", "", 10)).toThrowError("name is required");
    });

    it("it should throw error when total is not negative", () => {
        expect(() => new Product("123", "item legal", -1)).toThrowError("price should not be negative");
        expect(() => new Product("123", "item legal", -2)).toThrowError("price should not be negative");
        expect(() => new Product("123", "item legal", 0)).not.toThrowError("price should not be negative");
        expect(() => new Product("123", "item legal", 1)).not.toThrowError("price should not be negative");
    });

});
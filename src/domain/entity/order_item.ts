import assert from "./assert";

export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _productId: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        assert(id.length !== 0, "id is required");
        assert(name.length !== 0, "name is required");
        assert(price >= 0, "price should not be negative");

        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price * this._quantity;
    }

    get productId(): string {
        return this._productId;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}
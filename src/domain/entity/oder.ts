import assert from "./assert";
import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        assert(id.length !== 0, "id is required");
        assert(customerId.length !== 0, "customerId is required");
        assert(items.length !== 0, "at least 1 item is required");

        this._id = id;
        this._customerId = customerId;
        this._items = items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

}
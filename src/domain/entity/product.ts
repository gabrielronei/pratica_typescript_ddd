import assert from "./assert";

export default class Product {
    
    private _id: string;    
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        assert(id.length !== 0, "id is required");
        assert(name.length !== 0, "name is required");
        assert(price >= 0, "price should not be negative");

        this._id = id;
        this._name = name;
        this._price = price;
    }

    get id(): string {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    applyPercentageToPrice(percentage: number): number {
        const newValue = (this.price * percentage)/100 + this.price;

        this._price = newValue;
        
        return this._price;
    }
}
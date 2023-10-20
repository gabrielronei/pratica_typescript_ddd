import Address from "./address";
import assert from "./assert";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string, address: Address) {
        assert(id.length !== 0, "id is required");
        assert(name.length !== 0, "name is required");
        assert(address !== null, "address is required");

        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
    
    get street(): string {
        return this._address.street;
    }

    get number(): number {
        return this._address.number;
    }

    get zip(): string {
        return this._address.zip;
    }

    get city(): string {
        return this._address.city;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeName(name: string) {
        assert(name.length !== 0, "name is required");

        this._name = name;
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        this._active = true;
    }

    addRewardPoints(fullPrice: number) {
        this._rewardPoints += (fullPrice / 2);
    }
}
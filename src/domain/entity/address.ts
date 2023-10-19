export default class Address {
    private _street: string;
    private _number: number;
    private _zip: string;
    private _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
    }


}

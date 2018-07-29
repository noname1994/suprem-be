import { Product } from "./product.model";

export class Promotion {
    _id: string;
    name: string;
    scope: string;
    type: string;
    minimumMoney: number;
    minimumQuantity: number;
    donatedProduct: Array<any>;
    reducedPercent: number;
    appliedProduct: Array<any>;
    description: string;
    startedDate: Date;
    endedDate: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(body) {
        this._id = body._id;
        this.name = body.name;
        this.scope = body.scope;
        this.type = body.type;
        this.minimumMoney = body.minimumMoney;
        this.minimumQuantity = body.minimumQuantity;
        this.donatedProduct = body.donatedProduct;
        this.reducedPercent = body.reducedPercent;
        this.appliedProduct = body.appliedProduct;
        this.description = body.description;
        this.startedDate = body.startedDate;
        this.endedDate = body.endedDate;
        this.createdAt = body.createdAt;
        this.updatedAt = body.updatedAt;
    }
}
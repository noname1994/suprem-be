import { Category } from "./category.model";
import { ColorImage } from "./color-image.model";

export class Product {
    _id: string;
    name: string;
    category: any;
    tag: Array<String>;
    originalPrice: number;
    salePrice: number;
    status: string; //["AVAILABLE", "UNAVAIABLE", "DISABLE", "DELETED"]
    colorImage: Array<ColorImage>;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(body) {
        this._id = body._id;
        this.name = body.name;
        this.category = body.category;
        this.tag = body.tag;
        this.originalPrice = body.originalPrice;
        this.salePrice = body.salePrice;
        this.status = body.status;
        this.colorImage = body.colorImage;
        this.description = body.description;
        this.createdAt = body.createdAt;
        this.updatedAt = body.updatedAt;
    }
}
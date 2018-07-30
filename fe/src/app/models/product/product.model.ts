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
}
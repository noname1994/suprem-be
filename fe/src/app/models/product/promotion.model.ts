export class Promotion {
    _id: string;
    name: string;
    scope: string;
    type: string;
    status: string;
    imageCover: string;
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

}
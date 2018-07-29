export class Category {
    _id: string;

    name: string;

    imageCover: string;

    status: string;

    description: string;

    createdAt: Date;

    updatedAt: Date;

    constructor(body) {
        this._id = body._id;
        this.name = body.name;
        this.status = body.status;
        this.description = body.description;
        this.createdAt = body.createdAt;
        this.updatedAt = body.updatedAt;
    }
}
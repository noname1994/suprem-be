export class Province {
    _id: string;
    name: string;
    type: string;

    constructor(body) {
        this._id = body.id;
        this.name = body.name;
        this.type = body.type;
    }
}
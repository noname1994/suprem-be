export class Ward {
    _id: string;
    name: string;
    type: string;
    location: string;
    district: string;

    constructor(body) {
        this._id = body._id;
        this.name = body.name;
        this.type = body.type;
        this.location = body.location;
        this.district = body.district;
    }
}
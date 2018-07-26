export class District {
    _id: string;
    name: string;
    type: string;
    location: string;
    province: string;

    constructor(body) {
        this._id = body._id;
        this.name = body.name;
        this.type = body.type;
        this.location = body.location;
        this.province = body.province;
    }
}
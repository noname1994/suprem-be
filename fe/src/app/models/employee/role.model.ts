export class Role {
    _id: string;
    name: string;
    permission: Array<string>;

    constructor(_id: string, name: string, permission: Array<string>) {
        this._id = _id;
        this.name = name;
        this.permission = permission;
    }
}
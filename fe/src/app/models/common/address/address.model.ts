import { Ward } from "./ward.model";
import { District } from "./district.model";
import { Province } from "./province.model";

export class Address {
    detail: string;
    ward: Ward;
    district: District;
    province: Province;

    constructor(address) {
        this.detail = address.detail;
        this.ward = address.ward;
        this.district = address.district;
        this.province = address.province;
    }
}
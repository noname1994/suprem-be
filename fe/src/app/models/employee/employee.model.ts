import { Address } from "../common/address/address.model";
import { FacebookPage } from "../common/contact-social/facebook.model";
import { PhoneNumber } from "../common/contact-social/phone-number.model";
import { Role } from "./role.model";
import { Salary } from "./salary.model";
import { MonthlySalary } from "./monthly-salary.model";

export class Employee {
    _id: string;
    gen: string;
    email: string;
    address: Address;
    username: string;
    password: string;
    facebookPage: Array<FacebookPage>;
    phoneNumber: Array<PhoneNumber>;
    avatar: string;
    role: Role;
    salary: Salary;
    monthlySalary: MonthlySalary;
    dateWorking: Date;
    status: string;
    latestAccess: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(body) {
        this._id = body._id;
        this.gen = body.gen;
        this.email = body.email;
        this.address = body.address;
        this.username = body.username;
        this.password = body.password;
        this.facebookPage = body.facebookPage;
        this.phoneNumber = body.phoneNumber;
        this.avatar = body.avatar;
        this.role = body.role;
        this.salary = body.salary;
        this.monthlySalary = body.monthlySalary;
        this.dateWorking = body.dateWorking;
        this.status = body.status;
        this.latestAccess = body.latestAccess;
        this.createdAt = body.createdAt;
        this.updatedAt = body.updatedAt;
    }

}

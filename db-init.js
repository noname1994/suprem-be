/**
 * 
 * 
 */

const fs = require("fs");
const path = require("path");
const Employee = require("./api/models/employee/employee.model");
const Role = require("./api/models/employee/role.model");
const Ward = require("./api/models/vietnam-location/ward.model");
const Province = require("./api/models/vietnam-location/province.model");
const District = require("./api/models/vietnam-location/district.model");

const roles = [
    {
        name: "SUPER_ADMIN",
        permission: [
            "ALL"
        ]
    },
    {
        name: "ADMIN",
        permission: [

        ]
    },
    {
        name: "ACCOUNTANT",
        permission: [

        ]
    },
    {
        name: "STOCKER",
        permission: [
            "/file:POST",
            "/file:GET",

            "/product:POST",
            "/product:GET",
            "/product:PUT",
            "/product:DELETE",
            "/product/:_id:GET",

            "/category:POST",
            "/category:GET",
            "/category:PUT",
            "/category:DELETE",
            "/category/:_id:GET"
        ]
    },
    {
        name: "EMPLOYEE",
        permission: [

        ]
    }
]

const superAdmin = {
    "fullname": "Super Admin",
    "gen": "163313968",
    "email": "superadmin@hotmail.com",
    "address": {
        "detail": "Số 1, Phạm Văn Bạch",
        "ward": {
            "_id": 8,
            "name": "Nguyễn Trung Trực",
            "type": "Phường",
            "location": "21 02 36N, 105 50 43E"
        },
        "district": {
            "_id": 1,
            "name": "Ba Đình",
            "type": "Quận",
            "location": "21 02 08N, 105 49 38E"
        },
        "province": {
            "_id": 1,
            "name": "Hà Nội",
            "type": "Thành Phố"
        }
    },
    "username": "superadmin",
    "password": "abc13579",
    "facebookPage": "https://facebook.com.vn/tranducninhnd94",
    "phoneNumber": "01669709094",
    "role": "5b4c3a2783a8641f1c083ecc"

}

class DataInit {

    async createRole() {
        try {
            for (var i = 0; i < roles.length; i++) {
                let role = roles[i];
                let tmp = await Role.findOne({ name: role.name });
                if (!tmp) {
                    let rs = await Role.create(role);
                }
            }
            return roles;
        } catch (error) {
            throw error;
        }
    }

    async createSuperAdmin() {
        try {
            let emp = await Employee.findOne({ $or: [{ username: superAdmin.username }, { email: superAdmin.email }] });
            if (!emp) {
                emp = await Employee.create(superAdmin);
            }
            return emp;
        } catch (error) {
            throw error;
        }
    }

    async createProvince() {
        try {
            let rs = await Province.find().limit(1).exec();
            if (!rs || rs.length == 0) {
                let tmp = fs.readFileSync("./vn-db/province.json");
                let json = JSON.parse(tmp);
                await Province.insertMany(json);
            }
        } catch (error) {
            throw error;
        }
    }

    async createDistrict() {
        try {
            let rs = await District.find().limit(1).exec();
            if (!rs || rs.length == 0) {
                let tmp = fs.readFileSync("./vn-db/district.json");
                let json = JSON.parse(tmp);
                await District.insertMany(json);
            }
        } catch (error) {
            throw error;
        }
    }

    async createWard() {
        try {
            let rs = await Ward.find().limit(1).exec();
            if (!rs || rs.length == 0) {
                let tmp = fs.readFileSync("./vn-db/ward.json");
                let json = JSON.parse(tmp);
                await Ward.insertMany(json);
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = DataInit;
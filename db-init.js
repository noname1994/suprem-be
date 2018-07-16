/**
 * When Server init db-init.js will create fake database
 * disable : edit "start": "nodemon db.init.js ./bin/www"  in pakage.json
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
        name: "ADMIN",
        permission: [

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
        "ward": "Phường Yên Hòa",
        "district": "Quận Cầu Giấy",
        "province": "Hà Nội"
    },
    "username": "superadmin",
    "password": "abc13579",
    "facebook_page": [
        {
            "url": "https://facebook.com.vn/tranducninhnd94"
        },
        {
            "url": "https://facebook.com.vn/tranducninhnd95"
        }
    ],
    "phone_number": [
        {
            "number": "0166-97-09094"
        },
        {
            "number": "0166-97-09095"
        }
    ],
    "avatar": "http://localhost:8080/images/avater/default.jpg",
    "is_super_admin": true
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
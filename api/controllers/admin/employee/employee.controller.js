const appRoot = require('app-root-path');

const EmployeeService = require("../../../service/employee/employee.service");
const empService = new EmployeeService();



const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

class EmployeeController {

    async createEmployee(req, res, next) {
        try {
            let _body = req.body;
            
            let empResponse = await empService.create(_body);
            let entityResponse = stardardResponse.success(200, empResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updateEmployee(req, res, next) {

    }

    async deleteEmployee(req, res, next) {

    }

    async findEmployee(req, res, next) {

    }

    async findByParams(req, res, next) {
        try {
            let params = req.query || {};
            return res.json({ msg: "API is developing!" });
        } catch (error) {
            next(error);
        }
    }

    async findByUsername(req, res, next) {
        try {
            let _body = req.body;
            let empResponse = await empService.findByUsername(_body.username);
            let entityResponse = stardardResponse.success(200, empResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            let _body = req.body;
            let username = _body.username;
            let password = _body.password;

            let token = await empService.findByUsernameAndPassword(username, password);
            let entityResponse = stardardResponse.success(200, token);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = EmployeeController;
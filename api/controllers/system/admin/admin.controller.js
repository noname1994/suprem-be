const appRoot = require('app-root-path');

const EmployeeService = require("../../../service/employee/employee.service");
const empService = new EmployeeService();

const RoleService = require("../../../service/role/role.service");
const roleService = new RoleService();

const StandardRespone = require("../../../dto/response/standard.res");
const standardRespone = new StandardRespone();

class AdminController {
    async createEmployee(req, res, next) {
        try {
            let _body = req.body;
            let empResponse = await empService.create(_body);
            let entityResponse = standardRespone.success(200, empResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }


    async updateEmployee(req, res, next) {
        try {
            let _body = req.body;
            let empReponse = await empService.updateForAdmin(_body);
            let entityResponse = standardRespone.success(200, empReponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async deleteEmployee(req, res, next) {
        try {
            let str = req.query.arrId;
            let arrId = str.split(",");
            return res.json({ arrId });
        } catch (error) {
            next(error);
        }
    }

    async findEmployeeByParams(req, res, next) {
        try {
            let params = req.query || {};
            let arrResponse = await empService.findByParams(params);
            let entityResponse = standardRespone.success(200, arrResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }


    async getAllRoles(req, res, next) {
        try {
            let arrResponse = await roleService.findAll();
            let entityResponse = standardRespone.success(200, arrResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = AdminController;
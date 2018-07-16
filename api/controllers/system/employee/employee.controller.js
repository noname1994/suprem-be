const appRoot = require('app-root-path');

const EmployeeService = require("../../../service/employee/employee.service");
const empService = new EmployeeService();

const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

class EmployeeController {

    async updateEmployee(req, res, next) {
        try {
            let user = req.user;
            let _id = user._id;
            let _body = req.body;
            console.log("_id : ", _id);
            let empResponse = await empService.update(_id, _body);
            let entityResponse = stardardResponse.success(200, empResponse);
            return res.json(entityResponse);
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

    async changePassword(req, res, next) {
        try {
            let user = req.user;
            let _body = req.body;
            let _id = user._id;
            let newPassword = _body.newPassword;
            let rawResponse = await empService.updatePasword(_id, newPassword);
            let entityResponse = stardardResponse.success(200, rawResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getInformation(req, res, next) {
        try {
            let user = req.user;    
            let empResponse = await empService.findByEmail(user.email);
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

    async logout(req, res, next) {
        try {
            return res.json({ msg: "API is being developed!" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = EmployeeController;
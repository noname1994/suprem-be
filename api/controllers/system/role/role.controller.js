const appRoot = require('app-root-path');

const RoleService = require("../../../service/role/role.service");
const roleService = new RoleService();


const StandardRespone = require("../../../dto/response/standard.res");
const standardRespone = new StandardRespone();

const Constant = require("../../../utils/constants");

class RoleController {

    async getAll(req, res, next) {
        try {
            let arrResponse = await roleService.findAll();
            let entityResponse = standardRespone.success(200, arrResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = RoleController;
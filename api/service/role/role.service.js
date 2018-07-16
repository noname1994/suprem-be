const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const Role = require("../../models/employee/role.model");
const CustomizeError = require("../../exception/customize-error");

const RoleDTO = require("../../dto/role/role.dto");
const roleDTO = new RoleDTO();


const TAG = "STORAGE_SERVICE";

const fieldsEmployee = "_id fullname phone_number avatar";

class StorageService {

    async findAll() {
        try {
            let rs = await Role.find() || [];
            console.log("rs: ", rs);
            let arrResponse = rs.map(tmp => {
                return roleDTO.infoResponse(tmp);
            })

            return arrResponse;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = StorageService;
const appRoot = require('app-root-path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Employee = require("../../models/employee/employee.model");
const CustomizeError = require("../../exception/customize-error");

const EmployeeDTO = require("../../dto/employee/employee.dto");
const employeeDTO = new EmployeeDTO();

const Constant = require("../../utils/constants");


const TAG = "EMPLOYEE_SERVICE";

class EmployeeService {

    /**
     * 
     * @param {*} _body 
     */
    async create(_body) {
        // check email
        try {
            let newEmp = employeeDTO.infoCreate(_body);

            let tmp;
            let email = newEmp.email;
            tmp = await Employee.findOne({ email: { $eq: email } });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `Email "${email}" is existed`);
            }

            let username = newEmp.username;
            tmp = await Employee.findOne({ username: { $eq: username } });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `username: "${username}" is existed`);
            }

            let emp = new Employee(newEmp);
            let rs = await emp.save();

            let empResponse = employeeDTO.infoResponse(rs);
            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {*} _id 
     * @param {*} _body 
     */
    async update(_id, _body) {

        let newEmp = employeeDTO.infoUpdate(_body);

        let tmp;
        tmp = await Employee.findById(_id);
        if (!tmp) {
            throw new CustomizeError(TAG, 400, "employee isn't exist");
        }

        let email = newEmp.email;
        tmp = await Employee.findOne({ _id: { $ne: _id }, email: { $eq: email } });
        if (tmp) {
            throw new CustomizeError(TAG, 400, `${email} is existed`);
        }

        let username = newEmp.username;
        tmp = await Employee.findOne({ _id: { $ne: _id }, username: { $eq: username } });
        if (tmp) {
            throw new CustomizeError(TAG, 400, `${username} is existed`);
        }

        // let rs = await Employee.update(newEmp);
        let rs = await Employee.findByIdAndUpdate(_id, newEmp);
        if (!rs) {
            throw new CustomizeError(TAG, 400, `Not found employee neeed to updated`);
        }
        let empResponse = employeeDTO.infoResponse(rs);
        return empResponse;
    }

    async updateAvatar() {

    }

    async updateStatus() {

    }

    /**
     * 
     * @param {*} idEmp 
     * @param {*} newPassword 
     */
    async updatePasword(idEmp, newPassword) {
        try {
            let emp = await Employee.findById(idEmp);
            if (!emp) {
                throw new CustomizeError(TAG, 400, "Not found employee !");
            }

            let rounds = Constant.rounds;
            let salt = await bcrypt.genSalt(rounds);
            let hash = await bcrypt.hash(newPassword, salt);

            let rs = await Employee.updateOne({ _id: idEmp }, { password: hash });

            return rs;

            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    async delete() {

    }

    /**
     * 
     * @param {*} username 
     */
    async findByUsername(username) {
        try {
            let rs = await Employee.findOne({ username: username });
            if (!rs) {
                throw new CustomizeError(TAG, 400, `Not found employee with username = "${username}"`);
            }
            let empResponse = employeeDTO.infoResponse(rs);
            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * req.body    : {idEmp, roles, salary, status, dateWork}
     * roles       : ObjectId []
     * salary      : {baseSalary: number, positionSalary: number, allowanceSalary: number}
    */
    async updateForAdmin(_body) {
        try {

            let tmp = employeeDTO.infoUpdateForAdmin(_body);
            let idEmp = tmp._id;
            let roles = tmp.roles;
            let salary = tmp.salary;
            let status = tmp.status;
            let dateWorking = tmp.dateWorking;

            let emp = await Employee.findById(idEmp);
            if (!emp) {
                throw new CustomizeError(TAG, 400, "employee isn't exist");
            }

            if (roles) {
                fieldsUpdate.roles = roles;
            }
            if (salary) {
                fieldsUpdate.salary = salary;
            }
            if (status) {
                fieldsUpdate.status = status;
            }

            if (dateWorking) {
                fieldsUpdate.date_working = dateWorking;
            }

            await Employee.update({ "_id": idEmp }, fieldsUpdate);

            let rs = await Employee.findById(idEmp)
                .populate({ path: "roles", select: "_id name permission", model: "Role" }).exec();

            let empResponse = await employeeDTO.infoResponse(rs);
            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {*} email 
     */
    async findByEmail(email) {
        try {
            let rs = Employee.findOne({ email: email });
            if (!rs) {
                throw new CustomizeError(TAG, 400, `Not found employee with email = "${email}"`);
            }
            let empResponse = await employeeDTO.infoResponse(rs);
            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    async findByParams(params) {
        try {

            console.log("params: ", params);

            let condition = {};

            let _id = params._id;
            if (_id) {
                if (!mongoose.Types.ObjectId.isValid(_id)) {
                    let error = new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
                    throw error;
                }
                condition._id = { $eq: _id };
            }

            let gen = params.gen;
            if (gen) {
                condition.gen = { $eq: gen };
            }

            let email = params.email;
            if (email) {
                condition.email = new RegExp(email, 'i');
            }

            let username = params.username;
            if (username) {
                condition.email = new RegExp(username, 'i');
            }

            let fullname = params.fullname;
            if (fullname) {
                condition.email = new RegExp(fullname, 'i');
            }

            let rs = await Employee.find(condition)
                .populate({ path: "roles", select: "_id name permission", model: "Role" }).exec() || [];

            let arrResponse = rs.map(tmp => {
                return employeeDTO.infoResponse(tmp);
            })
            return arrResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {*} username 
     * @param {*} password 
     */
    async findByUsernameAndPassword(username, password) {
        try {
            let emp = await Employee.findOne({ $or: [{ username: username }, { email: username }] })
                .populate({ path: "roles", select: "_id name permission", model: "Role" }).exec();
            if (!emp) {
                throw new CustomizeError(TAG, 400, `Not found account with username = "${username}"`);
            }
            let hashPwd = emp.password;

            let check = await bcrypt.compare(password, hashPwd);
            if (!check) {
                throw new CustomizeError(TAG, 400, "Password is wrong");
            }

            let payload = employeeDTO.infoPayload(emp);

            let token = jwt.sign(payload, Constant.secret, { expiresIn: Constant.tokentokenExpiresIn, algorithm: Constant.algorithm });
            return token;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = EmployeeService;
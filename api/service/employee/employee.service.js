const appRoot = require('app-root-path');
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const Employee = require("../../models/employee/employee.model");
const CustomizeError = require("../../exception/customize-error");

const EmployeeDTO = require("../../dto/employee/employee.dto");
const employeeDTO = new EmployeeDTO();

const Constant = require("../../utils/constants");


const TAG = "EMPLOYEE_SERVICE";

class EmployeeService {

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

    async update(newEmp) {
        let tmp;

        let _id = newEmp._id;
        tmp = await Employee.findById(_id);
        if (tmp) {
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

        let rs = await Employee.update(newEmp);
        let empResponse = employeeDTO.infoResponse(rs);
        return empResponse;
    }

    updateAvatar() {

    }

    updateStatus() {

    }

    delete() {

    }

    findByUsername(username) {
        try {
            let rs = Employee.findOne({ username: username });
            if (!rs) {
                throw new CustomizeError(TAG, 400, `Not found employee with username = "${username}"`);
            }
            let empResponse = employeeDTO.infoResponse(rs);
            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    findByEmail(email) {
        try {
            let rs = Employee.findOne({ email: email });
            if (!rs) {
                throw new CustomizeError(TAG, 400, `Not found employee with email = "${email}"`);
            }
            let empResponse = employeeDTO.infoResponse(rs);
            return empResponse;
        } catch (error) {
            throw error;
        }
    }

    findByParams(params) {
        try {
            let condition = {};

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

            let rs = Employee.find(condition);
            return rs;
        } catch (error) {
            throw error;
        }
    }

    async findByUsernameAndPassword(username, password) {
        try {
            let emp = await Employee.findOne({ $or: [{ username: username }, { email: username }] });
            if (!emp) {
                throw new CustomizeError(TAG, `Not found account with username is "${username}"`);
            }
            let hashPwd = emp.password;
            let check = bcrypt.compareSync(password, hashPwd);
            if (!check) {
                throw new CustomizeError(TAG, 400, "Password is wrong");
            }

            let payload = employeeDTO.infoPayload(emp);

            let token = jwt.sign(payload, Constant.secret, { expiresIn: Constant.getTokentokenExpiresIn });
            return token;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = EmployeeService;
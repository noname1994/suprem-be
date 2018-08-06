class EmployeeDTO {

    infoCreate(body) {
        return {
            fullname: body.fullname,
            gen: body.gen,
            email: body.email,
            address: body.address,
            username: body.username,
            password: body.password,
            facebookPage: body.facebookPage,
            phoneNumber: body.phoneNumber,
            avatar: body.avatar,
            role: body.role || {},
            salary: body.salary,
            dateWorking: body.dateWorking || Date.now(),
            monthlySalary: [],
            createdAt: Date.now()
        }
    }

    infoUpdate(body) {

        let newEmp = {};
        let obj = {
            fullname: body.fullname,
            gen: body.gen,
            email: body.email,
            address: body.address,
            username: body.username,
            facebookPage: body.facebookPage,
            phoneNumber: body.phoneNumber,
            avatar: body.avatar,
            updatedAt: Date.now()
        }

        for (let key of Object.keys(obj)) {
            if (obj[key] != undefined && obj[key] != null) {
                newEmp[key] = obj[key];
            }
        }

        return newEmp;
    }

    infoChangePassword(body) {
        return {
            newPassword: body.newPassword
        }
    }


    infoUpdateForAdmin(body) {

        let idEmp = body._id;
        let role = body.role;
        let salary = body.salary;
        let status = body.status;
        let dateWorking = body.dateWorking;

        let tmp;

        if (idEmp) {
            tmp._id = idEmp;
        }
        if (role) {
            tmp.role = role;
        }
        if (salary && Object.keys(salary).length) {
            tmp.salary = salary;
        }

        if (status) {
            tmp.status = status;
        }

        if (dateWorking) {
            tmp.dateWorking = dateWorking;
        }

        console.log("newWorkPlace: ", tmp);
        return tmp;
    }

    updateMonthlySalary(body) {

    }


    infoResponse(result) {
        return {
            _id: result._id,
            fullname: result.fullname,
            gen: result.gen,
            email: result.email,
            address: result.address,
            username: result.username,
            password: result.password,
            facebookPage: result.facebookPage,
            phoneNumber: result.phoneNumber,
            avatar: result.avatar,
            role: result.role,
            salary: result.salary ? result.salary : null,
            monthlySalary: result.monthlySalary ? result.monthlySalary : [],
            dateWorking: result.dateWorking,
            status: result.status,
            latestAccess: result.latestAccess,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }

    infoPayload(emp) {
        return {
            _id: emp._id,
            fullname: emp.fullname,
            email: emp.email,
            role: emp.role,
            dateWorking: emp.dateWorking
        }
    }
}

module.exports = EmployeeDTO;
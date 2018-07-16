class EmployeeDTO {

    infoCreate(body) {

        let roles = tmp.roles || [];
        let salary = tmp.salary;
        let dateWorking = tmp.dateWorking;
        return {
            storage: storage,
            roles: roles,
            salary: {
                base_salary: salary.baseSalary,
                position_salary: salary.positionSalary,
                allowance_salary: salary.allowanceSalary
            },
            monthly_salary: [],
            date_working: dateWorking || Date.now()
        }

        return {
            fullname: body.fullname,
            gen: body.gen,
            email: body.email,
            address: body.address,
            username: body.username,
            password: body.password,
            facebook_page: body.facebookPage || [],
            phone_number: body.phoneNumber || [],
            avatar: body.avatar,
            roles: roles || [],
            salary: {
                base_salary: salary.baseSalary,
                position_salary: salary.positionSalary,
                allowance_salary: salary.allowanceSalary
            },
            date_working: dateWorking,
            monthly_salary: [],
            created_at: Date.now()
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
            fb_address: body.facebookPage,
            phone_number: body.phoneNumber,
            avatar: body.avatar,
            updated_at: Date.now()
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
        let roles = body.roles;
        let salary = body.salary;
        let status = body.status;
        let dateWorking = body.dateWorking;

        let tmp;

        if (idEmp) {
            tmp._id = idEmp;
        }
        if (roles) {
            tmp.roles = roles;
        }
        if (salary && Object.keys(salary).length) {
            let newSalary = {};
            if (salary.baseSalary || salary.baseSalary == 0) {
                newSalary.base_salary = salary.baseSalary;
            }
            if (salary.positionSalary || salary.positionSalary == 0) {
                newSalary.position_salary = salary.positionSalary;
            }
            if (salary.allowanceSalary || salary.allowanceSalary == 0) {
                newSalary.allowance_salary = salary.allowanceSalary;
            }
            tmp.salary = newSalary;
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
        let roles = result.roles;
        let salary = result.salary;
        let monthlySalary = result.monthly_salary;
        return {
            _id: result._id,
            fullname: result.fullname,
            gen: result.gen,
            email: result.email,
            address: result.address,
            username: result.username,
            password: result.password,
            facebookPage: result.facebook_page,
            phoneNumber: result.phone_number,
            avatar: result.avatar,
            roles: result.roles,
            salary: salary ? {
                baseSalary: salary.base_salary,
                positionSalary: salary.position_salary,
                allowanceSalary: salary.allowance_salary
            } : null,
            monthlySalary: monthlySalary ? monthlySalary.map(ms => {
                return {
                    status: ms.status,
                    dateReceived: ms.date_received,
                    baseSalary: ms.base_salary,
                    positionSalary: ms.position_salary,
                    promotionSalary: ms.promotion_salary,
                    allowanceSalary: ms.allowance_salary
                }
            }) : [],
            dateWorking: result.date_working,
            status: result.status,
            latestAccess: result.latest_access,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        }
    }

    infoPayload(emp) {
        return {
            _id: emp._id,
            fullname: emp.fullname,
            isSuperAdmin: emp.is_super_admin,
            email: emp.email,
            roles: emp.roles,
            dateWorking: emp.date_working
        }
    }
}

module.exports = EmployeeDTO;
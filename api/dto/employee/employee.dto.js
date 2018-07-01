class EmployeeDTO {

    infoCreate(body) {
        return {
            fullname: body.fullname,
            gen: body.gen,
            email: body.email,
            address: body.address,
            username: body.username,
            password: body.password,
            facebook_page: body.facebookPage,
            phone_number: body.phoneNumber,
            avatar: body.avatar,
            created_at: Date.now()
        }
    }

    infoCreateForAdmin(body) {

        let workPlaces = {};
        if (body.workPlaces) {
            workPlaces = body.workPlaces.map(tmp => {
                let store = tmp.store;
                let roles = tmp.roles;
                let salary = tmp.salary;
                let monthly_salary = tmp.monthlySalary;
                let dateWorking = tmp.dateWorking;
                return {
                    location: location,
                    roles: roles,
                    salary: {
                        base_salary: salary.baseSalary,
                        position_salary: salary.positionSalary,
                        allowance_salary: salary.allowanceSalary
                    },
                    monthlySalary: monthlySalary.map(ms => {
                        return {
                            status: ms.status,
                            date_received: ms.dateReceived,
                            base_salary: ms.baseSalary,
                            position_salary: ms.positionSalary,
                            promotion_salary: ms.promotionSalary,
                            allowance_salary: ms.allowanceSalary
                        }
                    }),
                    date_working: dateWorking
                }
            })
        }

        return {
            fullname: body.fullname,
            gen: body.gen,
            email: body.email,
            address: body.address,
            username: body.username,
            password: body.password,
            facebook_page: body.facebookPage,
            phone_number: body.phoneNumber,
            avatar: body.avatar,
            work_places: workPlaces,
            created_at: Date.now()
        }
    }

    infoUpdate(body) {
        return {
            _id: body._id,
            fullname: body.fullname,
            gen: body.gen,
            email: body.email,
            address: body.address,
            username: body.username,
            password: body.password,
            fb_address: body.facebookPage,
            phone_number: body.phoneNumber,
            avatar: body.avatar,
        }
    }

    infoUpdateForAdmin(body) {
        let workPlaces = {};
        if (body.workPlaces) {
            workPlaces = body.workPlaces.map(tmp => {
                let location = tmp.location;
                let roles = tmp.roles;
                let salary = tmp.salary;
                let monthly_salary = tmp.monthlySalary;
                let dateWorking = tmp.dateWorking;
                return {
                    store: store,
                    roles: roles,
                    salary: {
                        base_salary: salary.baseSalary,
                        position_salary: salary.positionSalary,
                        allowance_salary: salary.allowanceSalary
                    },
                    monthlySalary: monthlySalary.map(ms => {
                        return {
                            status: ms.status,
                            date_received: ms.dateReceived,
                            base_salary: ms.baseSalary,
                            position_salary: ms.positionSalary,
                            promotion_salary: ms.promotionSalary,
                            allowance_salary: ms.allowanceSalary
                        }
                    }),
                    date_working: dateWorking
                }
            })
        }
        return {
            _id: body._id,
            work_places: workPlaces
        }
    }


    infoResponse(result) {

        let workPlaces = [];
        if (result.work_places) {
            workPlaces = result.work_places.map(tmp => {
                let location = tmp.location;
                let roles = tmp.roles;
                let salary = tmp.salary;
                let monthlySalary = tmp.monthly_salary;
                let dateWorking = tmp.date_working;
                return {
                    location: location,
                    roles: roles,
                    salary: {
                        baseSalary: salary.base_salary,
                        positionSalary: salary.position_salary,
                        allowanceSalary: salary.allowance_salary
                    },
                    monthlySalary: monthlySalary.map(ms => {
                        return {
                            status: ms.status,
                            dateReceived: ms.date_received,
                            baseSalary: ms.base_salary,
                            positionSalary: ms.position_salary,
                            promotionSalary: ms.promotion_salary,
                            allowanceSalary: ms.allowance_salary
                        }
                    }),
                    dateWorking: dateWorking
                }
            })
        }

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
            workPlaces: workPlaces,
            latestAccess: result.latest_access,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        }
    }

    infoPayload(emp) {
        let stories = [];
        if (emp.stories) {
            stories = emp.stories.map(tmp => {
                let store = tmp.store;
                let roles = tmp.roles;
                let dateWorking = tmp.date_working;
                return {
                    store: store,
                    roles: roles,
                    dateWorking: dateWorking
                }
            })
        }

        return {
            _id: emp._id,
            fullname: emp.fullname,
            email: emp.email,
            stories: stories
        }

    }
}

module.exports = EmployeeDTO;
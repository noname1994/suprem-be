const jwt = require("jsonwebtoken");
const StandardRespone = require("../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

class Auth {

    /**
     * user : {_id: ObjectId, fullname: String, isSuperAdmin : boolean, workPlaces : []}
     * workPlaces: [
     *      {storage : {_id, name} , role:  {_id, permission, name} }
     * ]
     */

    isLogin(req, res, next) {
        if (req.user) next();
        else {
            res.status(403);
            let errorEntity = stardardResponse.clientError(403, "Token expired or not exist");
            return res.status(400).json(errorEntity);
        }
    }

    isAuthorization(req, res, next) {
        console.log("req: ", req.originalUrl);
        console.log("req :", req.method);
        if (req.user && req.user.role) {
            if (req.user.role.name == "SUPER_ADMIN") {
                next();
            } else {
                // let permission = req.user.role.permission;
                // let check = permission.filter(ele=>{

                // })
                next();
            }
        } else {
            res.status(403);
            let errorEntity = stardardResponse.clientError(403, "Token expired or not exist");
            return res.status(400).json(errorEntity);
        }
    }

    isSuperAdmin(req, res, next) {
        if (req.user && req.user.role && req.user.role.name == "SUPER_ADMIN") {
            next();
        } else {
            res.status(403);
            let errorEntity = stardardResponse.clientError(403, "You aren't SUPER ADMIN");
            return res.status(400).json(errorEntity);
        }

    }

    isAdmin(req, res, next) {
        next();
    }

    isAccountant(req, res, next) {
        next();
    }

    isStocker(req, res, next) {
        next();
    }

    isEmployee(req, res, next) {
        next();
    }
}

module.exports = Auth;

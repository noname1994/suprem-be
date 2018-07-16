const jwt = require("jsonwebtoken");
const StandardRespone = require("../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

class Auth {

    /**
     * user : {_id: ObjectId, fullname: String, isSuperAdmin : boolean, workPlaces : []}
     * workPlaces: [
     *      {storage : {_id, name} , roles: [ {_id, permission, name} ]}
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

    isSuperAdmin(req, res, next) {

        next();

    }

    isAdmin(req, res, next) {
        next();
    }

    isEmployee(req, res, next) {
        next();
    }
}

module.exports = Auth;

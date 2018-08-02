const jwt = require("jsonwebtoken");
const StandardRespone = require("../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

const prefix = "/api/v1";

class Auth {

    /**
     * user : {_id: ObjectId, fullname: String, email}
     * workPlaces: [
     *      {storage : {_id, name} , role:  {_id, permission, name} }
     * ]
     */

    isLogin(req, res, next) {
        if (req.user) next();
        else {
            let errorEntity = stardardResponse.clientError(403, "Bạn chưa đăng nhập !");
            return res.status(403).json(errorEntity);
        }
    }

    isAuthorization(req, res, next) {
        console.log("req : ", `${req.route.path}:${req.method}`);
        if (req.user && req.user.role) {
            if (req.user.role.name == "SUPER_ADMIN") {
                next();
            } else {
                let permission = req.user.role.permission;
                let tmp = permission.find(ele => {
                    return (ele == `${req.route.path}:${req.method}`);
                })
                if (tmp) {
                    next();
                } else {
                    let errorEntity = stardardResponse.clientError(403, "Bạn không có quyền !");
                    return res.status(403).json(errorEntity);
                }
            }
        } else {
            let errorEntity = stardardResponse.clientError(403, "Bạn không có quyền !");
            return res.status(403).json(errorEntity);
        }
    }
}

module.exports = Auth;

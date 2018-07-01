const jwt = require("jsonwebtoken");

class Auth {
    isLogin(req, res, next) {
        if (req.user) next();
        else {
            res.status(403);
            let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "Token expired or not exist");
            return res.json(error);
        }
    }

    isSuperAdmin(req, res, next) {

    }

    isAdmin(req, res, next) {
        next();
    }

    isEmployee(req, res, next) {
        next();
    }
}

module.exports = Auth;

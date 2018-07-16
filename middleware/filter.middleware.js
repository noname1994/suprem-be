const jwt = require("jsonwebtoken");
const StandardResponse = require("../api/dto/response/standard.res");
const standardResponse = new StandardResponse();

const Constant = require("../api/utils/constants");

class FilterMiddleware {
  filter(req, res, next) {
    console.log("token21321 : ", req.headers["authorization"]);
    if (req.headers && req.headers["authorization"] && req.headers["authorization"].split(" ")[0] == "JWT") {
      let token = req.headers.authorization.split(" ")[1];
      console.log("token : ", token);
      jwt.verify(token, Constant.secret, (error, decoded) => {
        if (error) {
          // new ErrorResponse(403, error.name, error.message);
          let errorResponse = standardResponse.clientError(403, error.message);
          return res.status(403).json(errorResponse);
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      req.user = undefined;
      next();
    }
  }
}

module.exports = FilterMiddleware;

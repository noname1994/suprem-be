const VNLocationService = require("../../../service/vietnam-location/vn-location.service");
const vnLocationService = new VNLocationService();
const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

const Constant = require("../../../utils/constants");

class VNLocationController {

    async getAllProvince(req, res, next) {
        try {
            let rawResponse = await vnLocationService.findAllProvince();
            let entityResponse = stardardResponse.success(200, rawResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }

    }

    async getDistrictByProvince(req, res, next) {
        try {
            let provinceId = req.query.provinceId;
            let rawResponse = await vnLocationService.findDistrictByProvince(provinceId);
            let entityResponse = stardardResponse.success(200, rawResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getWardByDistrict(req, res, next) {
        try {
            let districtId = req.query.districtId;
            let rawResponse = await vnLocationService.findWardByDistrict(districtId);
            let entityResponse = stardardResponse.success(200, rawResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }


}

module.exports = VNLocationController;
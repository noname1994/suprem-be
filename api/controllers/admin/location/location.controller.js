const appRoot = require('app-root-path');

const LocationService = require("../../../service/location/location.service");
const locationService = new LocationService();


const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

const Constant = require("../../../utils/constants");

class LocationController {

    async createLocation(req, res, next) {
        let _body = req.body;
        
        try {
            let locationRes = await locationService.create(_body);
            let entityResponse = stardardResponse.success(200, locationRes);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updateLocation(req, res, next) {
        let _body = req.body;
        try {
            let locationRes = await locationService.update(_body);
            let entityResponse = stardardResponse.success(200, locationRes);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async deleteLocation(req, res, next) {
        let arrId = req.query.arrId;
        try {
            return res.json({ msg: "API is developing !" });
        } catch (error) {
            next(error);
        }
    }

    async getLocation(req, res, next) {
        let _id = req.query._id;
        let name = req.query.name;
        let owner = req.query.owner;
        let status = req.query.status;
        let orderBy = req.query.orderBy || 'DESC';
        let sortBy = req.query.sortBy || 'created_at';
        let pageNum = req.query.pageNum ? Number(req.query.pageNum) : Constant.defaultPageNum;
        let pageSize = req.query.pageSize ? Number(req.query.pageSize) : Constant.defaultPageSize;
        let params = { _id, name, owner, status, sortBy, orderBy, pageNum, pageSize };
        try {
            let arrRes = await locationService.findByParams(params) || [];
            let entityResponse = stardardResponse.success(200, arrRes);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = LocationController;
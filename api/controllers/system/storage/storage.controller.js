const appRoot = require('app-root-path');

const StorageService = require("../../../service/storage/storage.service");
const storegeService = new StorageService();


const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

const Constant = require("../../../utils/constants");

class StorageController {

    async createStorage(req, res, next) {
        let _body = req.body;

        try {
            let storageResponse = await storegeService.create(_body);
            let entityResponse = stardardResponse.success(200, storageResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updateStorage(req, res, next) {
        let _body = req.body;
        try {
            let rawResponse = await storegeService.update(_body);
            let entityResponse = stardardResponse.success(200, rawResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async deleteStorage(req, res, next) {
        let tmp = req.query.arrId;

        try {
            let arr = tmp.split(",");
            let rawResponse = await storegeService.delete(arr);
            let entityResponse = stardardResponse.success(200, rawResponse);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getStorage(req, res, next) {
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
            let arrRes = await storegeService.findByParams(params) || [];
            let entityResponse = stardardResponse.success(200, arrRes);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        let _id = req.params._id;
        try {
            let storageRespone = await storegeService.findById(_id);
            let entityResponse = stardardResponse.success(200, storageRespone);
            return res.json(entityResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StorageController;
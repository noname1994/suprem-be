const appRoot = require('app-root-path');

const PromotionService = require("../../../service/product/promotion.service");
const promotionService = new PromotionService();

const StandardRespone = require("../../../dto/response/standard.res");
const standardRespone = new StandardRespone();

class PromotionController {

    async createPromotion(req, res, next) {
        try {
            let _body = req.body;
            let promotionResponse = await promotionService.create(_body);
            let entityResponse = standardRespone.success(200, promotionResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updatePromotion(req, res, next) {
        try {
            let _body = req.body;
            let promotionResponse = await promotionService.update(_body);
            let entityResponse = standardRespone.success(200, promotionResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            let params = req.query;
            let arrResponse = await promotionService.findAll(params);
            let entityResponse = standardRespone.success(200, arrResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PromotionController;
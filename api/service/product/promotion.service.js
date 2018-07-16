const mongoose = require("mongoose");
const appRoot = require("app-root-path");

const CustomizeError = require("../../exception/customize-error");

const Promotion = require("../../models/product/promotion.model");
const PromotionDTO = require("../../dto/product/promotion.dto");
const promotionDTO = new PromotionDTO();

const TAG = "PROMOTION_SERVICE";

class PromotionService {

    async create(_body) {
        try {
            let newPromotion = promotionDTO.infoCreate(_body);
            let promotion = new Promotion(newPromotion);
            let rs = await promotion.save();

            let promotionResponse = promotionDTO.infoResponse(rs);
            return promotionResponse;
        } catch (error) {
            throw error;
        }

    }

    async update(_body) {
        try {
            let newPromotion = promotionDTO.infoUpdate(_body);

            let _id = newPromotion._id;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                let error = new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
            }

            await Promotion.updateOne({ _id: _id }, { newPromotion });

            let rs = Promotion.findById(_id);
            let promotionResponse = promotionDTO.infoResponse(rs);
            return promotionResponse;

        } catch (error) {
            throw error;
        }
    }

    async delete() {

    }

    async findAll(params) {
        let pageNum = params.pageNum;
        let pageSize = params.pageSize;

        let limit = pageSize;
        let offset = pageNum * pageSize;

        let rs = await Promotion.find().limit(limit).skip(offset) || [];

        let arrResponse = rs.map(ele => {
            return promotionDTO.infoResponse(ele);
        })
        return arrResponse;
    }
}

module.exports = PromotionService;  
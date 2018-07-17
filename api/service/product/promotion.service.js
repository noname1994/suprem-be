const mongoose = require("mongoose");
const Promotion = require("../../models/product/promotion.model");
const Product = require("../../models/product/product.model");

const CustomizeError = require("../../exception/customize-error");

const PromotionDTO = require("../../dto/product/promotion.dto");
const promotionDTO = new PromotionDTO();

const TAG = "PROMOTION_SERVICE";

class PromotionService {
    async create(_body) {
        try {
            let newPromotion = promotionDTO.infoCreate(_body);

            let name = newPromotion.name;
            let tmp = await Promotion.findOne({ name: name });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `Promotion name "${name}" is existed !`);
            }
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
            let tmp;
            let newPromotion = promotionDTO.infoUpdate(_body);
            let _id = newPromotion._id;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
            }

            tmp = await Promotion.findById(_id);
            if (!tmp) {
                throw new CustomizeError(TAG, 400, "Promotion not exist !");;
            }

            let name = newPromotion.name;
            tmp = await Promotion.findOne({ name: name, _id: { $ne: _id } });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `Promotion name "${name}" is existed !`);
            }

            await Promotion.updateOne({ _id: _id }, newPromotion);
            let rs = await Promotion.findById(_id);
            let promotionResponse = promotionDTO.infoResponse(rs);
            return promotionResponse;
        } catch (error) {
            throw error;
        }
    }

    async findAll(params) {
        try {
            let condition = {};
            let type = params.type;
            if (type) {
                condition.type = type;
            }

            let pageNum = params.pageNum;
            let pageSize = params.pageSize;

            let limit = Number(pageSize);
            let offset = Number(pageNum) * Number(pageSize);

            let rs = await Promotion.find(condition).limit(limit).skip(offset).exec() || [];
            let arrResponse = rs.map(ele => {
                return promotionDTO.infoResponse(ele);
            })
            return arrResponse;
        } catch (error) {
            throw error;
        }
    }

    async findById(_id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
            }
            let rs = await Promotion.findById(_id);
            let promotionResponse = promotionDTO.infoResponse(rs);
            return promotionResponse;
        } catch (error) {
            throw error;
        }
    }

    async delete(arrId) {
        try {
            let rs = await Promotion.deleteMany({ _id: { $in: arrId } });
            await Product.updateMany(
                { "promotion.information": { $in: arrId } },
                {
                    $pull: {
                        promotion: { information: { $in: arrId } }
                    }
                }
            )
            return rs;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PromotionService;
class PromotionDTO {

    infoCreate(body) {
        let tmp = {};
        let type = body.type;
        let name = body.name;
        tmp.name = name;
        tmp.type = type;
        if (type == "PERCENT") {
            tmp.percent_formula = body.percentFormula;
        } else if (type == "GIFT") {
            tmp.gift_formula = body.giftFormula;
        }
        tmp.description = body.description;
        tmp.createdAt = Date.now();

        let newPromotion = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newPromotion[key] = tmp[key];
            }
        }
        return newPromotion;
    }

    infoUpdate(body) {
        let tmp = {};
        let _id = body._id;
        let name = body.name;
        let type = body.type;
        tmp._id = _id;
        tmp.name = name;
        tmp.type = type;
        if (type == "PERCENT") {
            tmp.percent_formula = body.percentFormula;
        } else if (type == "GIFT") {
            tmp.gift_formula = body.giftFormula;
        }
        tmp.description = body.description;
        tmp.updatedAt = Date.now();

        let newPromotion = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newPromotion[key] = tmp[key];
            }
        }

        return newPromotion;
    }

    infoResponse(promotion) {
        let tmp = {};
        tmp._id = promotion._id;
        tmp.name = promotion.name;
        tmp.type = promotion.type;

        if (tmp.type == "PERCENT") {
            tmp.percentFormula = promotion.percentFormula;
        } else if (tmp.type == "GIFT") {
            tmp.giftFormula = promotion.giftFormula;
        }

        tmp.description = promotion.description;
        tmp.createdAt = promotion.createdAt;
        tmp.updatedAt = promotion.updatedAt;

        return tmp;
    }
}

module.exports = PromotionDTO;
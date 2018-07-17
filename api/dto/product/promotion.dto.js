class PromotionDTO {

    infoCreate(body) {
        let tmp = {};
        let type = body.type;
        let name = body.name;
        tmp.name = name;
        tmp.type = type;
        if (type == "PERCENT") {
            let formula = body.percentFormula;
            tmp.percent_formula = {
                purchased_quantity: formula.purchasedQuantity,
                reduced_percent: formula.reducedPercent
            };
        } else if (type == "GIFT") {
            let formula = body.giftFormula;
            tmp.gift_formula = {
                purchased_quantity: formula.purchasedQuantity,
                donated_quantity: formula.donatedQuantity,
                donated_product: formula.donatedProduct
            };
        }
        tmp.description = body.description;
        tmp.created_at = Date.now();

        return tmp;
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
            let formula = body.percentFormula;
            tmp.percent_formula = {
                purchased_quantity: formula.purchasedQuantity,
                reduced_percent: formula.reducedPercent
            };
        } else if (type == "GIFT") {
            let formula = body.giftFormula;
            tmp.gift_formula = {
                purchased_quantity: formula.purchasedQuantity,
                donated_quantity: formula.donatedQuantity,
                donated_product: formula.donatedProduct
            };
        }
        tmp.description = body.description;
        tmp.updated_at = Date.now();

        return tmp;
    }

    infoResponse(promotion) {
        let tmp = {};
        tmp._id = promotion._id;
        tmp.name = promotion.name;
        tmp.type = promotion.type;

        if (tmp.type == "PERCENT") {
            let formula = promotion.percent_formula;
            tmp.percentFormula = {
                purchasedQuantity: formula.purchased_quantity,
                reducedPercent: formula.reduced_percent
            };
        } else if (tmp.type == "GIFT") {
            let formula = promotion.gift_formula;
            tmp.giftFormula = {
                purchasedQuantity: formula.purchased_quantity,
                donatedQuantity: formula.donated_quantity,
                donatedProduct: formula.donated_product
            };
        }

        tmp.description = promotion.description;
        tmp.createdAt = promotion.created_at;
        tmp.updatedAt = promotion.updated_at;

        return tmp;
    }
}

module.exports = PromotionDTO;
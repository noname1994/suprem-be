class PromotionDTO {

    infoCreate(body) {
        let tmp = {};
        let type = body.type;
        tmp.type = type;
        if (type == "PERCENT") {
            let formula = body.percentFormula;
            tmp.percent_formula = {
                quantity_purchased: formula.quantityPurchased,
                reduced_percent: formula.reducedPercent
            };
        } else if (type == "GIFT") {
            let formula = body.giftFormula;
            tmp.gift_formula = {
                quantity_purchased: formula.quantityPurchased,
                reduced_percent: formula.donatedQuantity,
                donated_product: formula.donatedProduct
            }
        }
        tmp.description = body.description;
        tmp.created_at = Date.now();

        return tmp;
    }

    infoUpdate(body) {
        let tmp = {};
        let _id = body._id;
        let type = body.type;
        tmp._id = _id;
        tmp.type = type;
        if (type == "PERCENT") {
            let formula = body.percentFormula;
            tmp.percent_formula = {
                quantity_purchased: formula.quantityPurchased,
                reduced_percent: formula.reducedPercent
            };
        } else if (type == "GIFT") {
            let formula = body.giftFormula;
            tmp.gift_formula = {
                quantity_purchased: formula.quantityPurchased,
                reduced_percent: formula.donatedQuantity,
                donated_product: formula.donatedProduct
            }
        }
        tmp.description = body.description;
        tmp.created_at = Date.now();

        return tmp;
    }

    infoResponse(promotion) {
        let tmp = {};
        tmp._id = promotion._id;
        tmp.type = promotion.type;
        if (type == "PERCENT") {
            tmp.percentFormula = body.percent_formula;
        } else if (type == "GIFT") {
            tmp.giftFormula = body.giftFormula.gift_formula;
        }

        if (type == "PERCENT") {
            let formula = body.percent_formula;
            tmp.percentFormula = {
                quantityPurchased: formula.quantity_purchased,
                reducedPercent: formula.reduced_percent
            };
        } else if (type == "GIFT") {
            let formula = body.gift_formula;
            tmp.giftFormula = {
                quantityPurchased: formula.quantity_purchased,
                donatedQuantity: formula.reduced_percent,
                donatedProduct: formula.donated_product
            }
        }

        tmp.description = promotion.description;
        tmp.createdAt = promotion.created_at;
        tmp.updatedAt = promotion.updated_at;

        return tmp;
    }
}

module.exports = PromotionDTO;
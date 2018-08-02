class PromotionDTO {

    infoCreate(body) {
        let tmp = {
            name: body.name,
            scope: body.scope,
            type: body.type,
            minimumMoney: body.minimumMoney,
            minimumQuantity: body.minimumQuantity,
            donatedProduct: body.donatedProduct,
            reducedPercent: body.reducedPercent,
            appliedProduct: body.appliedProduct,
            imageCover: body.imageCover,
            status: "ACTIVE",
            description: body.description,
            startedDate: body.startedDate,
            endedDate: body.endedDate,
            createdAt: Date.now()
        };

        let newPromotion = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newPromotion[key] = tmp[key];
            }
        }
        return newPromotion;
    }

    infoUpdate(body) {
        let tmp = {
            _id: body._id,
            name: body.name,
            scope: body.scope,
            type: body.type,
            status: body.status,
            minimumMoney: body.minimumMoney,
            minimumQuantity: body.minimumQuantity,
            donatedProduct: body.donatedProduct,
            reducedPercent: body.reducedPercent,
            appliedProduct: body.appliedProduct,
            imageCover: body.imageCover,
            description: body.description,
            startedDate: body.startedDate,
            endedDate: body.endedDate,
            updatedAt: Date.now()
        };
        let newPromotion = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newPromotion[key] = tmp[key];
            }
        }

        return newPromotion;
    }

    infoResponse(promotion) {
        return {
            _id: promotion._id,
            name: promotion.name,
            scope: promotion.scope,
            type: promotion.type,
            status: promotion.status,
            minimumMoney: promotion.minimumMoney,
            minimumQuantity: promotion.minimumQuantity,
            donatedProduct: promotion.donatedProduct,
            reducedPercent: promotion.reducedPercent,
            appliedProduct: promotion.appliedProduct,
			imageCover: promotion.imageCover ,
            description: promotion.description,
            startedDate: promotion.startedDate,
            endedDate: promotion.endedDate,
            createdAt: promotion.createdAt,
            updatedAt: promotion.updatedAt
        };
    }
}

module.exports = PromotionDTO;
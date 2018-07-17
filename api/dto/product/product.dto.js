class ProductDTO {

    infoCreate(body) {
        let tmp = {
            name: body.name,
            category: body.category,
            tag: body.tag,
            original_price: body.originalPrice,
            sale_price: body.salePrice,
            status: body.status,
            color_image: body.colorImage ? body.colorImage.map(ele => {
                return {
                    color: ele.color,
                    image: ele.image ? ele.image : [],
                    priority: ele.priority
                }
            }) : [],
            promotion: body.promotion ? body.promotion.map(ele => {
                return {
                    information: ele.information,
                    started_date: ele.startedDate,
                    ended_date: ele.endedDate
                }
            }) : [],
            description: body.description,
            create_at: Date.now()
        }

        let newProduct = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newProduct[key] = tmp[key];
            }
        }

        return newProduct;
    }


    infoUpdate(_body) {
        let tmp = {
            _id: body._id,
            name: body.name,
            category: body.category,
            tag: body.tag,
            original_price: body.originalPrice,
            sale_price: body.salePrice,
            status: body.status,
            color_image: body.colorImage ? body.colorImage.map(ele => {
                return {
                    color: ele.color,
                    image: ele.image ? ele.image : [],
                    priority: ele.priority
                }
            }) : null,
            promotion: body.promotion ? body.promotion.map(ele => {
                return {
                    information: ele.information,
                    started_date: ele.startedDate,
                    ended_date: ele.endedDate
                }
            }) : null,
            description: body.description,
            create_at: Date.now()
        }

        let newProduct = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newProduct[key] = tmp[key];
            }
        }

        return newProduct;
    }

    infoResponse(product) {
        return {
            _id: product._id,
            name: product.name,
            category: product.category,
            tag: product.tag,
            originalPrice: product.original_price,
            salePrice: product.sale_price,
            status: product.status,
            colorImage: product.color_image ? product.color_image.map(ele => {
                return {
                    color: ele.color,
                    image: ele.image ? ele.image : [],
                    priority: ele.priority
                }
            }) : [],
            promotion: product.promotion ? product.promotion.map(ele => {
                return {
                    information: ele.information,
                    startedDate: ele.started_date,
                    endedDate: ele.ended_date
                }
            }) : [],
            description: product.description,
            createdAt: product.create_at,
            updatedAt: product.updated_at
        }
    }

}

module.exports = ProductDTO;
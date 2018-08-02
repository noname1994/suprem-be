class ProductDTO {

    infoCreate(body) {
        let tmp = {
            name: body.name,
            category: body.category,
            tag: body.tag,
            originalPrice: body.originalPrice,
            salePrice: body.salePrice,
            status: body.status,
            imageCover: body.imageCover,
            colorImage: body.colorImage ? body.colorImage.map(ele => {
                return {
                    color: ele.color,
                    image: ele.image ? ele.image : [],
                    priority: ele.priority
                }
            }) : [],
            description: body.description,
            createdAt: Date.now()
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
            originalPrice: body.originalPrice,
            salePrice: body.salePrice,
            status: body.status,
            imageCover: body.imageCover,
            colorImage: body.colorImage ? body.colorImage.map(ele => {
                return {
                    color: ele.color,
                    image: ele.image ? ele.image : [],
                    priority: ele.priority
                }
            }) : null,
            description: body.description,
            createdAt: Date.now()
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
            originalPrice: product.originalPrice,
            salePrice: product.salePrice,
            status: product.status,
            imageCover: product.imageCover,
            colorImage: product.colorImage ? product.colorImage.map(ele => {
                return {
                    color: ele.color,
                    image: ele.image ? ele.image : [],
                    priority: ele.priority
                }
            }) : [],
            description: product.description,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }

}

module.exports = ProductDTO;
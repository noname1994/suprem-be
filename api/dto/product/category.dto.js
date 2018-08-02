class CategoryDTO {

    infoCreate(body) {
        return {
            name: body.name,
            description: body.description,
			imageCover: body.imageCover,
            createdAt: Date.now()
        }
    }

    infoUpdate(body) {
        let tmp = {
            _id: body._id,
            name: body.name,
			imageCover: body.imageCover,
            status: body.status,
            description: body.description,
            updatedAt: Date.now()
        }

        let newCategory = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != null && tmp[key] != undefined) {
                newCategory[key] = tmp[key];
            }
        }
        return newCategory;
    }

    infoResponse(category) {
        return {
            _id: category._id,
            name: category.name,
            status: category.status,
			imageCover: category.imageCover ,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    }
}
module.exports = CategoryDTO;
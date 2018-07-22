class CategoryDTO {

    infoCreate(body) {
        return {
            name: body.name,
            description: body.name,
            createdAt: Date.now()
        }
    }

    infoUpdate(body) {
        let tmp = {
            _id: body._id,
            name: body.name,
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
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    }
}
module.exports = CategoryDTO;
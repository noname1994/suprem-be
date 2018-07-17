class CategoryDTO {

    infoCreate(body) {
        return {
            name: body.name,
            description: body.name,
            created_at: Date.now()
        }
    }

    infoUpdate(body) {
        return {
            _id: body._id,
            name: body.name,
            description: body.description,
            updated_at: Date.now()
        }
    }

    infoResponse(category) {
        return {
            _id: category._id,
            name: category.name,
            description: category.description,
            createdAt: category.created_at,
            updatedAt: category.updated_at
        }
    }
}
module.exports = CategoryDTO;
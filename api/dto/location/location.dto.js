class LocationDTO {

    infoCreate(body) {
        return {
            name: body.name,
            address: body.address,
            phone_number: body.phoneNumber,
            fax: body.fax,
            owner: body.owner,
            created_at: Date.now()
        }
    }

    infoUpdate(body) {
        return {
            _id: body._id,
            name: body.name,
            address: body.address,
            phone_number: body.phoneNumber,
            fax: body.fax,
            owner: body.owner,
            updated_at: Date.now()
        }
    }

    infoRespones(body) {
        return {
            _id: body._id,
            name: body.name,
            address: body.address,
            phoneNumber: body.phone_number,
            fax: body.fax,
            owner: body.owner,
            createdAt: body.created_at,
            updatedAt: body.updated_at
        }
    }

}

module.exports = LocationDTO;
class StorageDTO {

    infoCreate(body) {
        return {
            name: body.name,
            address: body.address,
            phone_number: body.phoneNumber,
            owner: body.owner,
            created_at: Date.now()
        }
    }

    infoUpdate(body) {

        let tmp = {
            _id: body._id,
            name: body.name,
            address: body.address,
            phone_number: body.phoneNumber,
            status: body.status
        }

        let newStorage = {};
        for (let key of Object.keys(tmp)) {
            if (tmp[key] != undefined && tmp[key] != null) {
                newStorage[key] = tmp[key];
            }
        }
        console.log("newStorage : ", newStorage);
        newStorage["updated_at"] = Date.now();
        return newStorage;
    }

    infoRespones(body) {
        let owner = body.owner;
        return {
            _id: body._id,
            name: body.name,
            address: body.address,
            phoneNumber: body.phone_number || [],
            status: body.status,
            owner: owner ? {
                _id: owner._id,
                fullname: owner.fullname,
                phoneNumber: owner.phone_number,
                avatar: owner.avatar
            } : null,
            createdAt: body.created_at,
            updatedAt: body.updated_at
        }
    }

}

module.exports = StorageDTO;
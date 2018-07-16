class RoleDTO {

    infoResponse(role) {
        return {
            _id: role._id,
            name: role.name,
            permission: role.permission
        }

    }
}

module.exports = RoleDTO;
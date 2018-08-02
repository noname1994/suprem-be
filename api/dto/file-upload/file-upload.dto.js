class FileUploadDTO {

    infoCreate(_body, type) {
        return {
            path: _body.path,
            size: _body.size,
            mimetype: _body.mimetype,
            originalname: _body.originalname,
            encoding: _body.encoding,
            filename: _body.filename,
            type: type
        }
    }

    infoResponse(result) {
        return {
            _id: result._id,
            path: result.path ? result.path.substring(6,result.path.length) : "\\image_default.jpg",
            size: result.size,
            mimetype: result.mimetype,
            originalname: result.originalname,
            encoding: result.encoding,
            filename: result.filename,
            type: result.type,
            createAt: result.createAt
        }
    }
}

module.exports = FileUploadDTO;
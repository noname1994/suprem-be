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
            path: result.path,
            size: result.size,
            mimetype: result.mimetype,
            originalname: result.originalname,
            encoding: result.encoding,
            filename: result.filename,
            type: result.type,
            createAt: result.created_at
        }
    }
}

module.exports = FileUploadDTO;
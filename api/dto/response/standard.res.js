class StandardResponse {

    success(code, value) {
        return {
            code: code,
            message: "Success",
            value: value
        }
    }

    clientError(code, msg) {
        return {
            code: code,
            message: msg
        }
    }

    serverError(error) {
        return {
            code: 500,
            message: "Internal server",
            error: error
        }
    }
}

module.exports = StandardResponse;
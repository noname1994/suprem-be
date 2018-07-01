const appRoot = require("app-root-path");

const secretKey = "secret_key";

const defaultPageNum = 0;

const defaultPageSize = 100;

class Constant {

    static get secretKey() {
        return secretKey;
    }

    static get defaultPageNum() {
        return defaultPageNum;
    }

    static get defaultPageSize() {
        return defaultPageSize;
    }
}

module.exports = Constant;
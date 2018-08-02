const appRoot = require("app-root-path");

const secretKey = "secret_key";

const defaultPageNum = 0;

const defaultPageSize = 100;

const rounds = 10;

const secret = "dev-secret";

const tokenExpiresIn = 60 * 60 * 365;

const algorithm = "HS256";

const imageUploadPath = "public/images";

const otherPath = "public/others";

const documentUploadPath = "public/documents";

const imageAvatarPath = "public/images/avatars";

const imageProductPath = "public/images/products";

const imageBannerPath = "public/images/banners";

const limitedSizeUpload = 5 * 1024 * 1024;

const maximumNumberFileUpload = 5;

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

    static get rounds() {
        return rounds;
    }

    static get secret() {
        return secret;
    }

    static get tokentokenExpiresIn() {
        return tokenExpiresIn;
    }

    static get algorithm() {
        return algorithm;
    }

    static get imageUploadPath() {
        return imageUploadPath;
    }

    static get documentUploadPath() {
        return documentUploadPath;
    }

    static get limitedSizeUpload() {
        return limitedSizeUpload;
    }

    static get maximumNumberFileUpload() {
        return maximumNumberFileUpload;
    }

    static get imageAvatarPath() {
        return imageAvatarPath;
    }

    static get imageProductPath() {
        return imageProductPath;
    }

    static get imageBannerPath() {
        return imageBannerPath;
    }

    static get otherPath() {
        return otherPath;
    }
}

module.exports = Constant;
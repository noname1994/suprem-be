const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Constant = require("../../utils/constants");

const Schema = mongoose.Schema;

const FileUploadSchema = new Schema(
    {
        path: {
            type: String,
            require: true
        },
        size: {
            type: String,
            require: true
        },
        mimetype: {
            type: String,
            require: true
        },
        originalname: {
            type: String,
            require: true
        },
        encoding: {
            type: String,
            require: true
        },
        filename: {
            type: String,
            require: true
        },
        type: {
            type: String,
            enum: ["AVATAR", "IMAGE_PRODUCT", "DOCUMENT", "OTHER"],
            default: "OTHER"
        },
        createdAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model("FileUpload", FileUploadSchema);
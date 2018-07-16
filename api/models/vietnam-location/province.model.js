const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        type: {
            type: String
        }
    }, {
        _id: false
    }
)
module.exports = mongoose.model("Province", ProvinceSchema);
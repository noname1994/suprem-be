const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictSchema = new mongoose.Schema(
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
        },
        location: {
            type: String
        },
        province: {
            type: String,
            ref: "Province"
        }
    }, {
        _id: false
    }
)

module.exports = mongoose.model("District", DistrictSchema);
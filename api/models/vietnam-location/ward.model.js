const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WardSchema = new mongoose.Schema(
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
        district: {
            type: String,
            ref: "District"
        }
    }, {
        _id: false
    }
)

module.exports = mongoose.model("Ward", WardSchema);
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            ward: {
                type: String
            },
            district: {
                type: String
            },
            province: {
                type: String
            }
        },
        phone_number: [
            {
                type: String
            }
        ],
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        },
        fax: {
            type: String
        },
        owner: {
            type: String
        },
        created_at: {
            type: Date
        },
        updated_at: {
            type: Date
        }
    }
)

module.exports = mongoose.model("location", LocationSchema);

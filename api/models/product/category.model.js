const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"]
        },
        description: {
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

module.exports = mongoose.model("Category", CategorySchema);

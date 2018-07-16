const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            enum: []
        },
        tag: {
            type: String,
            enum: []
        },
        original_price: {
            type: Number,
            required: true,
            default: 0
        },
        sale_price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["AVAILABLE", "UNAVAIABLE", "DISABLE", "DELETED"],
            default: "AVAILABLE"
        },
        image_url: [
            {
                _id: false,
                url: {
                    type: String
                },
                priority: {
                    type: String,
                    default: 0
                }
            }
        ],
        promotion: [
            {
                infomation: {
                    type: Schema.Types.ObjectId,
                    ref: "Promotion"
                },
                started_date: {
                    type: Date
                },
                ended_date: {
                    type: Date
                }
            }
        ],
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

module.exports = mongoose.model("Product", ProductSchema);

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
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        tag: [
            {
                type: String,
                enum: []
            }
        ],
        originalPrice: {
            type: Number,
            required: true,
            default: 0
        },
        salePrice: {
            type: Number
        },
        status: {
            type: String,
            enum: ["AVAILABLE", "UNAVAIABLE", "DISABLE", "DELETED"],
            default: "AVAILABLE"
        },
        imageCover: {
            type: String
        },
        colorImage: [
            {
                color: {
                    type: String
                },
                image: [
                    {
                        _id: false,
                        url: {
                            type: String
                        }
                    }
                ],
                priority: {
                    type: String,
                    default: 0
                }
            }
        ],
        description: {
            type: String
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model("Product", ProductSchema);

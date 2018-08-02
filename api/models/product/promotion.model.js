const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromotionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        scope: {
            type: String,
            enum: ["ALL_PRODUCT", "SPECIAL_PRODUCT"]
        },
        type: {
            type: String,
            enum: ["TOTAL_MONEY", "PURCHASED_QUANTITY"]
        },

        minimumMoney: {
            type: String
        },
        minimumQuantity: {
            type: Number
        },
        donatedProduct: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        reducedPercent: {
            type: Number
        },

        appliedProduct: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
		imageCover:{
			type: String
		},
        description: {
            type: String
        },
        startedDate: {
            type: Date
        },
        endedDate: {
            type: Date
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model("Promotion", PromotionSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromotionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["PERCENT", "GIFT"]
        },

        percentFormula: {
            purchasedQuantity: {
                type: Number
            },

            reducedPercent: {
                type: Number
            }
        }
        ,
        giftFormula: {
            purchasedQuantity: {
                type: Number
            },
            donatedQuantity: {
                type: Number
            },
            donatedProduct: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        },
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

module.exports = mongoose.model("Promotion", PromotionSchema);

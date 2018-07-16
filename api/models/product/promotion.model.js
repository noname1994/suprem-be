const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromotionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["PERCENT", "GIFT"]
        },

        percent_formula: [
            {
                quantity_purchased: {
                    type: Number,
                    default: 1
                },

                reduced_percent: {
                    type: Number,
                    default: 0
                }
            }
        ],
        gift_formula: [
            {
                quantity_purchased: {
                    type: Number,
                    default: 1
                },
                donated_quantity: {
                    type: Number,
                    default: 0
                },
                donated_product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
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

module.exports = mongoose.model("Promotion", PromotionSchema);

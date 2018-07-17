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

        percent_formula: {
            purchased_quantity: {
                type: Number
            },

            reduced_percent: {
                type: Number
            }
        }
        ,
        gift_formula: {
            purchased_quantity: {
                type: Number
            },
            donated_quantity: {
                type: Number
            },
            donated_product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        }
        ,
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

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Constant = require("../../utils/constants");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        },
        addressShipping: {
            detail: {
                type: String
            },
            ward: {
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
                }
            },
            district: {
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
                }
            },
            province: {
                _id: {
                    type: String,
                    required: true
                },
                name: {
                    type: String
                },
                type: {
                    type: String
                }
            }
        },
        arrProduct: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                },
                purchasedQuantity: {
                    type: Number,
                    required: true
                },
                appliedPrice: {
                    type: Number,
                    required: true
                }
            }
        ],
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"],
            default: "ACTIVE"
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model("Customer", CustomerSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Constant = require("../../utils/constants");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        address_shipping: {
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
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            default: "abc13579"
        },
        phone_number: [
            {
                _id: false,
                number: {
                    type: String
                }
            }
        ],
        avatar: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"],
            default: "ACTIVE"
        },
        account_type: {
            type: String,
            enum: ["FACEBOOK", "GOOGLE", "SYSTEM"]
        },
        latest_access: {
            type: Date
        },
        created_at: {
            type: Date
        },
        updated_at: {
            type: Date,
            default: Date.now()
        }
    }
)

CustomerSchema.pre("save", async function (next) {
    try {
        const emp = this;
        let password = emp.password;
        let rounds = Constant.rounds;
        let salt = await bcrypt.genSalt(rounds);
        let hash = await bcrypt.hash(password, salt);
        emp.password = hash;
        next();
    } catch (error) {
        throw error;
    }
})

module.exports = mongoose.model("Customer", CustomerSchema);
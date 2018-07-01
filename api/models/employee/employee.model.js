const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Constant = require("../../utils/constants");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        gen: {
            type: String,
            required: true
        },
        email: {
            type: String,
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
        facebook_page: [
            {
                url: {
                    type: String
                }
            }
        ],
        phone_number: [
            {
                number: {
                    type: String
                }
            }
        ],
        avatar: {
            type: String
        },
        work_places: [
            {
                location: {
                    type: Schema.Types.ObjectId,
                    ref: "Store"
                },
                roles: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Role"
                    }
                ],
                salary: {
                    base_salary: {
                        type: Number,
                        default: 0
                    },
                    position_salary: {
                        type: Number,
                        default: 0
                    },
                    allowance_salary: {
                        type: Number,
                        default: 0
                    }
                },
                monthly_salary: [
                    {
                        status: {
                            type: String,
                            enum: ["RECEIVED", "NOT_RECEIVED"],
                        },
                        date_received: {
                            type: Date
                        },
                        base_salary: {
                            type: Number,
                            default: 0
                        },
                        position_salary: {
                            type: Number,
                            default: 0
                        },
                        promotion_salary: {
                            type: Number,
                            default: 0
                        },
                        allowance_salary: {
                            type: Number,
                            default: 0
                        }
                    }
                ],
                date_working: {
                    type: Date
                },
            }
        ],
        latest_access: {
            type: Date
        },
        created_at: {
            type: Date
        },
        updated_at: {
            type: Date,
        }
    }
)

EmployeeSchema.pre("save", () => {
    console.log("employee : ", this);
})

module.exports = mongoose.model("Empoloyee", EmployeeSchema);
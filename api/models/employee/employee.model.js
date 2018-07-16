const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
            required: true,
            unique: true
        },
        address: {
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
        facebook_page: [
            {
                _id: false,
                url: {
                    type: String
                }
            }
        ],
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
                    default: "NOT_RECEIVED"
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
            type: Date,
            default: Date.now()
        },

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"],
            default: "ACTIVE"
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

EmployeeSchema.pre("save", async function (next) {
    try {
        const emp = this;
        let password = emp.password;
        let rounds = Constant.rounds;
        let salt = await bcrypt.genSalt(rounds);
        console.log("salt: ", salt);
        let hash = await bcrypt.hash(password, salt);
        console.log("hash: ", hash);
        emp.password = hash;
        next();
    } catch (error) {
        throw error;
    }
})

module.exports = mongoose.model("Employee", EmployeeSchema);
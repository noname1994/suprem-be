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
        facebookPage: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        avatar: {
            type: String
        },

        role: {
            type: Schema.Types.ObjectId,
            ref: "Role"
        },
        salary: {
            baseSalary: {
                type: Number,
                default: 0
            },
            positionSalary: {
                type: Number,
                default: 0
            },
            allowanceSalary: {
                type: Number,
                default: 0
            }
        },
        monthlySalary: [
            {
                status: {
                    type: String,
                    enum: ["RECEIVED", "NOT_RECEIVED"],
                    default: "NOT_RECEIVED"
                },
                dateReceived: {
                    type: Date
                },
                baseSalary: {
                    type: Number,
                    default: 0
                },
                positionSalary: {
                    type: Number,
                    default: 0
                },
                promotionSalary: {
                    type: Number,
                    default: 0
                },
                allowanceSalary: {
                    type: Number,
                    default: 0
                }
            }
        ],
        dateWorking: {
            type: Date,
            default: Date.now()
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"],
            default: "ACTIVE"
        },
        latestAccess: {
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

EmployeeSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("Employee", EmployeeSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorageSchema = new mongoose.Schema(
    {
        name: {
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
        phoneNumber: [
            {
                _id: false,
                number: {
                    type: String
                }
            }
        ],
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"],
            default: "ACTIVE"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model("Storage", StorageSchema);

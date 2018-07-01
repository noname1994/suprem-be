const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        permission: [
            {
                type: String
            }
        ]
    }
)


module.exports =  mongoose.model("Role", RoleSchema);
const { default: mongoose } = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: {type: String, default: ""}
});

module.exports = {
    PermissionModel: mongoose.model("permission", PermissionSchema)
}
const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String, lowercase: true},
    email: {type: String, lowercase: true},
    mobile: {type: String, required: true},
    password: {type: String},
    otp: {type: Object, default: {code: 0, expiresIn: 0}},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    address: {type: String},
    aboutme: {type: String},
    roles: {type: String, default: "USER"},
    Recipe: {type: [mongoose.Types.ObjectId], default: [], ref: "recipe"},
    RecipeVideo: {type: [mongoose.Types.ObjectId], default: [], ref: "recipeVideo"}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
UserSchema.index({firstname: "text", lastname: "text", username: "text", email: "text", roles: "text"});

module.exports = {
    UserModel: mongoose.model("user", UserSchema)
}
const { default: mongoose } = require("mongoose");

const AboutSchema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    image: {type: String, default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category"}
}, {
    timestamps: true
});

module.exports = {
    AboutModel: mongoose.model("about", AboutSchema)
}
const { default: mongoose } = require("mongoose");

const IconShcema = new mongoose.Schema({
    title: {type: String, required: true},
    favicon: {type: String, required: true}
})

module.exports = {
    IconModel: mongoose.model("icon", IconShcema)
}
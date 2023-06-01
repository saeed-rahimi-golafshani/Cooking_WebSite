const { default: mongoose } = require("mongoose");

const CitySchema = new mongoose.Schema({
    title: {type: String, required: true}
});

module.exports = {
    CityModel: mongoose.model("city", CitySchema)
};
const { default: mongoose } = require("mongoose");

const ContactSchema = new mongoose.Schema({
    phone: {type: String},
    email: {type: String, lowercase: true},
    address: {type: String},
    fax: {type: String}
});

module.exports = {
    ContactModel: mongoose.model("contact", ContactSchema)
}
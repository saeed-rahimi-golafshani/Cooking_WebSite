const joi = require("joi");
const { PHONE_PATTERN, EMAIL_PATTERN } = require("../../../Utills/Constants");
const createHttpError = require("http-errors");

const createContactSchema = joi.object({
    phone: joi.string().pattern(PHONE_PATTERN).error(createHttpError.BadRequest("ساختار شماره تلفن ثابت اشتباه است")),
    email: joi.string().pattern(EMAIL_PATTERN).error(createHttpError.BadRequest("ساختار ایمیل وارد شده اشتباه است")),
    address: joi.string().error(createHttpError.BadRequest("ساختار آدرس وارد شده اشتباه است")),
    fax: joi.string().pattern(PHONE_PATTERN).error(createHttpError.BadRequest("ساختار شماره فکس وارد شده اشتباه است"))
});

module.exports = {
    createContactSchema
}
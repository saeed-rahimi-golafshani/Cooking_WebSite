const joi = require("joi");
const { MOBILE_PATTERN } = require("../../../Utills/Constants");
const createHttpError = require("http-errors");

const loginWithOtpSchema = joi.object({
    mobile: joi.string().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار شماره موبایل اشتباه است"))
});
const checkLoginSchema = joi.object({
    code: joi.string().min(4).max(6).error(createHttpError.BadRequest("ساختار کد ارسال شده اشتباه است")),
    mobile: joi.string().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار شماره موبایل اشتباه است")) 
})

module.exports = {
    loginWithOtpSchema,
    checkLoginSchema
}
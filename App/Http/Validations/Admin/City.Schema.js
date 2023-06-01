const createHttpError = require("http-errors");
const joi = require("joi");

const createCitySchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان منطقه انتخابی اشتباه است"))
})

module.exports = {
    createCitySchema
}
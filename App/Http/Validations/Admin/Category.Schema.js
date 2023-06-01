const joi = require("joi");
const createHttpError = require("http-errors");
const { MONGOID_PATTERN } = require("../../../Utills/Constants")

const createCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی اشتباه است")),
    parent: joi.string().allow('').pattern(MONGOID_PATTERN).allow('').error(createHttpError.BadRequest("ساختار شناسه وارد شده صحیح نمیباشد"))
});
const listCategorySchema = joi.object({
    parent: joi.string().allow('').pattern(MONGOID_PATTERN).allow('').error(createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است"))
});
const updateCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی اشتباه است"))
})

module.exports = {
    createCategorySchema,
    listCategorySchema,
    updateCategorySchema
}
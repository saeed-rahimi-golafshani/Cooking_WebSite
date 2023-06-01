const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants")

const createAboutSchema = joi.object({
    title: joi.string().min(5).max(50).error(createHttpError.BadRequest("ساختار عنوان موزد نظر صحیح نمی باشد")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن مورد نظر صحیح نمی باشد")),
    category: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی مورد نظر صحیح نمی باشد")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: joi.allow()
})

module.exports = {
    createAboutSchema
}
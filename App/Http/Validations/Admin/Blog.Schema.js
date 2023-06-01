const createHttpError = require("http-errors");
const joi = require("joi");
const { FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants");

const createBlogSchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان مقاله اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار متن مقاله اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن مقاله اشتباه است")),
    tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار برچسب مقاله اشتباه است")),
    category: joi.array().min(1).max(10).error(createHttpError.BadRequest("ساختار دسته بندی مقاله اشتباه است")),
    source: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار منابع برای مقالات اشتباه است")),
    filename : joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: joi.allow()
});

module.exports = {
    createBlogSchema
};
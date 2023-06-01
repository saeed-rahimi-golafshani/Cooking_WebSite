const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants");

const createRecipeSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان آینم مورد نظر اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار متن مورد نظر اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن مورد نظر اشتباه است")),
    recipe_number: joi.string().min(4).max(6).error(createHttpError.BadRequest("ساختار کد دستور پخت اشتباه است")),
    Region_food: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار منطقه غذایی اشتباه است")),
    category: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی آیتم مورد نظر اشتباه است")),
    tags: joi.array().items(joi.string()).min(0).max(10).error(createHttpError.BadRequest("ساختار برچسب مورد نظر اشتباه است")),
    source: joi.array().items(joi.string()).min(0).max(10).error(createHttpError.BadRequest("ساختار منابع مورد نظر اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: joi.allow()
});

module.exports = {
    createRecipeSchema
}
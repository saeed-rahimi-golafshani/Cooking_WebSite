const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants");

const createRecipeVideoSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دستور پخت اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار متن وارد شده اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن وارد شده اشتباه است")),
    category: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی اشتباه است")),
    region_food: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار منطقه غذایی اشتباه است")),
    source: joi.array().items(joi.string()).min(0).max(10).error(createHttpError.BadRequest("ساختار منابع مورد نظر اشتباه است")),
    tags: joi.array().items(joi.string()).min(0).max(10).error(createHttpError.BadRequest("ساختار برچسب مورد نظر اشتباه است")),
    price: joi.number().error(createHttpError.BadRequest(" ساختار قیمت وارد شده صحیح نمیباشد")),
    discount: joi.number().error(createHttpError.BadRequest("ساختار تخفیف وارد شده صحیح نمیباشد")),
    type: joi.string().regex(/(free|cash|special)/i).error(createHttpError.BadRequest("ساختار نوع وارد شده اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: joi.allow() 
});
const createRecipeEpisodeSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دستور پخت اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن وارد شده اشتباه است")),
    type: joi.string().pattern(/(lock|unlock)/i).error(createHttpError.BadRequest("ساختار نوع وارد شده اشتباه است")),
    recipevideoId : joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest(" ساختار شناسه ی دستور پخت صحیح نمی باشد")),
    filename: joi.string().pattern(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv)$/).error(createHttpError.BadRequest(" فرمت تصویر ارسال شده صحیح نمیباشد")) ,
    fileUploadPath: joi.allow()
})

module.exports = {
    createRecipeVideoSchema,
    createRecipeEpisodeSchema
}
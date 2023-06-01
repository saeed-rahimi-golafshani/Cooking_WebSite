const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utills/Constants")

const createRoleSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان برای نقش کاربری اشتباه است")),
    description: joi.string().error(createHttpError.BadRequest("ساختار توصیف برای نقش کاربری اشتباه است")),
    permissions: joi.array().items(joi.string().pattern(MONGOID_PATTERN)).error(createHttpError.BadRequest("ساختار سطح دسترسی برای کاربران اشتباه است"))

});
const createPermissionSchema = joi.object({
    name: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار نام برای سطح دسترسی اشتباه است")),
    description: joi.string().error(createHttpError.BadRequest("ساختار توصیف برای سطح دسترسی اشتباه است"))
});

module.exports = { 
    createRoleSchema,
    createPermissionSchema
}

const Controller = require("../../Controlle");
const { createRecipeVideoSchema } = require("../../../Validations/Admin/RecipeVideo.Schema");
const { randomNumberFiveDigitsGenerator, listOfImagesFromRequest, copyObject, deleteFileInPath, deleteInvalidPropertyInObject } = require("../../../../Utills/Function");
const { RecipeVideoModel } = require("../../../../Models/RecipeVideo.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes")
const path = require("path");
const { default: mongoose } = require("mongoose");
const { object } = require("joi");
const recipeVideoBlockList ={ 
    COMMENTS: "comments",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    VIEW: "view",
    SCORE: "score",
    EPISODE: "episode"
};
Object.freeze(recipeVideoBlockList)

class AdminRecipeVideoController extends Controller{
    async createRecipeVideo(req, res, next){
        try {
            const recipeDataBody = await createRecipeVideoSchema.validateAsync(req.body);
            const recipe_number = randomNumberFiveDigitsGenerator();
            const author = req.user._id;
            req.body.image = path.join(recipeDataBody.fileUploadPath, recipeDataBody.filename);
            req.body.image = req.body.image.replace(/\\/g, "/");
            const image = req.body.image;
            const {title, short_text, text, category, region_food, source, tags, price, discount, type} = recipeDataBody;
            await this.checkExistRecipeVideoByTitle(title);
            if(Number(price) > 0 && type == "free") throw createHttpError.BadRequest("برای دستور پخت های رایگان قیمت نمی توان قیمت ثبت کرد")
            if(Number(price) == 0 && type == "cash") throw createHttpError.BadRequest("برای دستور پخت های رایگان قیمت نمی توان قیمت ثبت کرد")
            const createResault = await RecipeVideoModel.create({
                title,
                short_text,
                text,
                category,
                region_food,  
                source,
                tags, 
                price,
                discount,
                type,
                recipe_number,
                author,
                image
            });
            if(!createResault) throw createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "عملیات با موفقیت انجام شد"
                }
            });

        } catch (error) {
            deleteFileInPath(req.body.image)
            next(error)
        }
    }
    async listOfRecipeVideo(req, res, next){
        try {
            const recipeVideo = await RecipeVideoModel.aggregate([
                {$match: {}},
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $lookup: {
                        from: "cities",
                        localField: "region_food",
                        foreignField: "_id",
                        as: "region_food"
                    }
                },
                {
                    $unwind: "$region_food"
                },
                {
                    $project: {
                        "region_food.__v": 0,
                        "category.__v": 0,
                        "category.parent": 0,
                        "category.createdAt": 0,
                        "category.updatedAt": 0,
                        "author.otp": 0,
                        "author.password": 0,
                        "author.createdAt": 0,
                        "author.updatedAt": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.__v": 0,
                        "author.roles": 0,
                        "author.email": 0,
                        "author.username": 0,
                        "author.birthday": 0,
                        "author.address": 0,
                        "author.aboutme": 0,
                        "author.Recipe": 0,
                        "author.RecipeVideo": 0
                    }
                }
            ]);
            if(!recipeVideo) throw createHttpError.NotFound("لیستی از دستور پخت یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    recipeVideo
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfRecipeVideoById(req, res, next){
        try {
            const { id } = req.params;
            const recipeVideo = await this.checkExistRecipeVideoById(id);
            const resault = await RecipeVideoModel.aggregate([
                {$match: {_id: recipeVideo._id}},
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $lookup: {
                        from: "cities",
                        localField: "region_food",
                        foreignField: "_id",
                        as: "region_food"
                    }
                },
                {
                    $unwind: "$region_food"
                },
                {
                    $project: {
                        "region_food.__v": 0,
                        "category.__v": 0,
                        "category.parent": 0,
                        "category.createdAt": 0,
                        "category.updatedAt": 0,
                        "author.otp": 0,
                        "author.password": 0,
                        "author.createdAt": 0,
                        "author.updatedAt": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.__v": 0,
                        "author.roles": 0,
                        "author.email": 0,
                        "author.username": 0,
                        "author.birthday": 0,
                        "author.address": 0,
                        "author.aboutme": 0,
                        "author.Recipe": 0,
                        "author.RecipeVideo": 0
                    }
                }
            ]);
            if(!resault) throw createHttpError.NotFound("دستور پختی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    recipeVideo: resault
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async updateRecipeVideo(req, res, next){
        try {
            const { id } = req.params;
            const recipeVideo = await this.checkExistRecipeVideoById(id);
            const data = copyObject(req.body);
            if(data.fileUploadPath && data.filename){
                data.image = path.join(data.fileUploadPath, data.filename);
                data.image = data.image.replace(/\\/g, "/");
            }
            let blackListFeilds = Object.values(recipeVideoBlockList);
            deleteInvalidPropertyInObject(data, blackListFeilds);
            const updateResault = await RecipeVideoModel.updateOne({_id: recipeVideo._id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async deleteRecipeVideo(req, res, next){
        try {
            const { id } = req.params;
            const recipeVideo = await this.checkExistRecipeVideoById(id);
            const deleteResault = await RecipeVideoModel.deleteOne({_id: recipeVideo._id});
            if(deleteResault.deletedCount == 0) throw createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "حذف با موفقیا انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistRecipeVideoByTitle(title){
        const recipeVideo = await RecipeVideoModel.findOne({title});
        if(recipeVideo) throw createHttpError.BadRequest(" این دستور پخت از قبل ثبت شده است");
        return recipeVideo
    }
    async checkExistRecipeVideoById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest(" ساختار شناسه مورد نظر اشتباه است");
        const recipeVideo = await RecipeVideoModel.findById(id);
        if(!recipeVideo) throw createHttpError.NotFound("دستور پخت یافت نشد");
        return recipeVideo
    }
}

module.exports = {
    AdminRecipeVideoController: new AdminRecipeVideoController()
}
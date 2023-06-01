const createHttpError = require("http-errors");
const { RecipeModel } = require("../../../../Models/Recipe.Model");
const { deleteInvalidPropertyInObject, deleteFileInPath, randomNumberFiveDigitsGenerator, listOfImagesFromRequest, copyObject } = require("../../../../Utills/Function");
const { createRecipeSchema } = require("../../../Validations/Admin/Recipe.Schema");
const Controller = require("../../Controlle");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const recipeBlockList = {
    COMMENTS: "comments",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    VIEW: "view",
    SCORE: "score"
};
Object.freeze(recipeBlockList);

class AdminRecipeController extends Controller{
    async createRecipe(req, res, next){
        try {
            const recipeDataBody = await createRecipeSchema.validateAsync(req.body);
            const { title, short_text, text, Region_food, category, tags, source } = recipeDataBody;
            await this.checkExistRecipeByTitle(title);
            req.body.images = listOfImagesFromRequest(req?.files || [], recipeDataBody.fileUploadPath);
            const images = req.body.images;
            const recipe_number = randomNumberFiveDigitsGenerator();
            const author = req.user._id;
            const createResault = await RecipeModel.create({
                title,
                short_text,
                text,
                Region_food,
                category,
                tags,
                source,
                images,
                recipe_number,
                author
            });
            if(!createResault) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "دستور پخت با موفقیت ثبت شد"
                }
            });
            
        } catch (error) {
            deleteFileInPath(req?.body?.images)
            next(error)
        }
    }
    async listRecipe(req, res, next){
        try {
            const search = req?.query?.search || "";
            let recipes;
            if(search) {
                recipes = await RecipeModel.findOne({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                }).populate([
                    {path: "author", select: {mobile: 1, firstname: 1, lastname: 1, username: 1}},
                    {path: "category", select: {title: 1}},
                    {path: "Region_food", select: {title: 1}}
                ])
            }else {
                recipes = await RecipeModel.find({}).populate([
                    {path: "author", select: {mobile: 1, firstname: 1, lastname: 1, username: 1}},
                    {path: "category", select: {title: 1}},
                    {path: "Region_food", select: {title: 1}}
                ]).sort({_id: -1});
            }
            if(!recipes) throw createHttpError.NotFound("دستور آشپزی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    ListOfRecipe: recipes
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listRecipeById(req, res, next){
        try {
            const { id } = req.params;
            const recipe = await this.checkExistRecipeById(id);
            const resault = await RecipeModel.aggregate([
                {$match: {_id: recipe._id}},
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
                        localField: "Region_food",
                        foreignField: "_id",
                        as: "Region_food"
                    }
                },
                {
                    $unwind: "$Region_food"
                },
                {
                    $project: {
                        "Region_food.__v": 0,
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
            if(!resault) throw createHttpError.NotFound("دستور پخت یافت نشد ");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    ListOfRecipeById: resault
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateRecipe(req, res, next){
        try {
            const { id } = req.params;
            const recipe = await this.checkExistRecipeById(id);
            const data = copyObject(req.body);
            if(data.fileUploadPath && data.filename){
                data.images = listOfImagesFromRequest(req.files || [], data.fileUploadPath)
            };
            let blackListFeilds = Object.values(recipeBlockList)
            deleteInvalidPropertyInObject(data, blackListFeilds);
            const updateResault = await RecipeModel.updateOne({_id: recipe._id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("به روز رسانی انجام نشد");
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
    async removeRecipe(req, res, next){
        try {
            const { id } = req.params;
            const recipe = await this.checkExistRecipeById(id);
            const deleteResault = await RecipeModel.deleteOne({_id: recipe._id});
            if(deleteResault.deletedCount == 0) throw createHttpError.InternalServerError("دستور پخت حذف نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دستور پخت با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistRecipeByTitle(title){
        const recipe = await RecipeModel.findOne({title});
        if(recipe) throw createHttpError.BadRequest("عنوان دستور پخت از قبل ثبت شده است، لطفا عنوان دیگری را امتحان کنید")
        return recipe
    }
    async checkExistRecipeById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه وارد شده اشتباه است");
        const recipe = await RecipeModel.findById(id);
        if(!recipe) throw createHttpError.NotFound("دستور پخت یافت نشد")
        return recipe
    }
}

module.exports = {
    AdminRecipeController: new AdminRecipeController()
}
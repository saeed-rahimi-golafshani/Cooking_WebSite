const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/Verify.AccessToken");
const { default: mongoose, isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { checkExistBlog, checkExistRecipe, checkExistRecipeVideo } = require("../Utils");
const { copyObject } = require("../../Utills/Function");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { RecipeModel } = require("../../Models/Recipe.Model");
const { RecipeVideoModel } = require("../../Models/RecipeVideo.Model");

const CreateCommentForBlog = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        blogId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { comment, blogId, parent } = args;
        if(!mongoose.isValidObjectId(blogId)) throw createHttpError.BadRequest("ساختار شناسه برای مقاله اشتباه است");
        await checkExistBlog(blogId);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument = await getComment(BlogModel, parent);
            console.log(commentDocument);
            if(commentDocument && !commentDocument?.opentocomment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResault = await BlogModel.updateOne({
                "comments._id": parent
            }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        user: user._id,
                        show: false,
                        opentocomment: false

                    }
                }
            })
            if(!createAnswerResault.modifiedCount){
                throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
            } 
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت پاسخ با موفقیت انجام شد"
                }
            } 
        } else {
            await BlogModel.updateOne({_id: blogId},
                {
                    $push: {
                        comments: {
                            comment,
                            user: user._id,
                            show: false,
                            opentocomment: true
                        }
                    }
                })
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت ثبت خواهد شد"
                }
            }
        }
    }
}
const CreateCommentForRecipe = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        recipeId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { comment, recipeId, parent } = args;
        await checkExistRecipe(recipeId);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument = await getComment(RecipeModel, parent);
            if(commentDocument && !commentDocument?.opentocomment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResault = await RecipeModel.updateOne({
                "comments._id": parent
            }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        user: user._id,
                        show: false,
                        opentocomment: false
                    }
                }
            })
            if(!createAnswerResault.modifiedCount){
                throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
            }
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت پاسخ با موفقیت انجام شد"
                }
            }
        } else {
            await RecipeModel.updateOne(
                {_id: recipeId}, {
                    $push: {
                        comments: {
                            comment,
                            user: user._id,
                            show: false,
                            opentocomment: true
                        }
                    }
                });
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت ثبت خواهد شد"
            }
        }
    }
}
const CreateCommentForRecipeVideo = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        recipeVideoId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { comment, recipeVideoId, parent } = args;
        await checkExistRecipeVideo(recipeVideoId);
        if(parent && mongoose,isValidObjectId(parent)){
            const commentDocument = await getComment(RecipeVideoModel, parent);
            if(commentDocument && !commentDocument?.opentocomment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResault = await RecipeVideoModel.updateOne(
                {"comments._id": parent},{
                    $push: {
                        "comments.$.answers": {
                            comment,
                            user: user._id,
                            show: false,
                            opentocomment: false
                        }
                    }
                })
                if(!createAnswerResault.modifiedCount){
                    throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
                }
                return {
                    statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت پاسخ با موفقیت انجام شد"
                }
                }
        } else {
            await RecipeVideoModel.updateOne(
                {_id: recipeVideoId}, 
                {$push: {
                    comments: {
                        comment,
                        user: user._id,
                        show: false,
                        opentocomment: true
                    }
                }}
            )
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت ثبت خواهد شد"
            }
        }
    }
}
async function getComment(model, id){
    const findComment = await model.findOne({"comments._id": id}, {"comments.$": 1});
    const comment = copyObject(findComment);
    if(!comment?.comments?.[0]) throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
    return comment?.comments?.[0]
}

module.exports = {
    CreateCommentForBlog,
    CreateCommentForRecipe,
    CreateCommentForRecipeVideo
}
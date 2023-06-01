const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/Verify.AccessToken");
const { checkExistBlog, checkExistRecipe, checkExistRecipeVideo } = require("../Utils");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { RecipeModel } = require("../../Models/Recipe.Model");
const { RecipeVideoModel } = require("../../Models/RecipeVideo.Model");

const DislikeBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const likedBlog = await BlogModel.findOne({_id: blogId, likes: user._id});
        const dislikedBlog = await BlogModel.findOne({_id: blogId, dislikes: user._id});
        const updateQuery = dislikedBlog? {$pull: {dislikes: user._id}}:{$push: {dislikes: user._id}};
        await BlogModel.updateOne({_id:  blogId}, updateQuery);
        let message;
        if(!dislikedBlog){
            if(likedBlog) await BlogModel.updateOne({_id: blogId}, {$pull: {likes: user._id}})
            message = "نپسندیدن مقاله با موفقیت انجام شد"
        } else {
            message = "نپسندیدن مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
}
const DislikeRecipe = {
    type: ResponseType,
    args: {
        recipeId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { recipeId } = args;
        await checkExistRecipe(recipeId);
        const likedRecipe = await RecipeModel.findOne({_id: recipeId, likes: user._id});
        const disLikedRecipe = await RecipeModel.findOne({_id: recipeId, dislikes: user._id});
        const updateQuery = disLikedRecipe? {$pull: {dislikes: user._id}}:{$push: {dislikes: user._id}};
        await RecipeModel.updateOne({_id: recipeId}, updateQuery);
        let message;
        if(!disLikedRecipe) {
            if(likedRecipe) await RecipeModel.updateOne({_id: recipeId}, {$pull: {likes: user._id}});
            message= "نپسندیدن دستور پخت با موفقیت انجام شد"
        } else {
            message = "نپسندیدن دستور پخت لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
}
const DislikeRecipeVideo = {
    type: ResponseType,
    args: {
        recipeVideoId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { recipeVideoId } = args;
        await checkExistRecipeVideo(recipeVideoId);
        const likedRecipeVideo = await RecipeVideoModel.findOne({_id: recipeVideoId, likes: user._id});
        const dislikedRecipevideo = await RecipeVideoModel.findOne({_id: recipeVideoId, dislikes: user._id});
        const updateQuery = dislikedRecipevideo? {$pull: {dislikes: user._id}}:{$push: {dislikes: user._id}};
        await RecipeVideoModel.updateOne({_id: recipeVideoId}, updateQuery);
        let message;
        if(!dislikedRecipevideo){
            if(likedRecipeVideo) await RecipeVideoModel.updateOne({_id: recipeVideoId}, {$pull: {likes: user._id}});
            message = "نپسندیدن دستور پخت با موفقیت انجام شد"
        } else {
            message = "نپسندیدن دستور پخت لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
}

module.exports = {
    DislikeBlog,
    DislikeRecipe,
    DislikeRecipeVideo
}
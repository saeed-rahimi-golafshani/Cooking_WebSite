const { GraphQLString } = require("graphql");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/Verify.AccessToken");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { checkExistBlog, checkExistRecipeVideo } = require("../Utils");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistRecipe } = require("../Utils");
const { RecipeModel } = require("../../Models/Recipe.Model");
const { RecipeVideoModel } = require("../../Models/RecipeVideo.Model");

const LikeBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const likeBlogs = await BlogModel.findOne({_id: blogId, likes: user._id});
        const dislikeBlog = await BlogModel.findOne({_id: blogId, dislikes: user._id});
        const findQuery = likeBlogs? {$pull: {likes: user._id}}:{$push: {likes: user._id}};
        await BlogModel.updateOne({_id: blogId}, findQuery);
        let message;
        if(!likeBlogs){
            if(dislikeBlog) await BlogModel.updateOne({_id: blogId}, {$pull: {dislikes: user._id}})
            message = "پسندیدن مقاله با موفقیت انجام شد"
        } else {
            message = "پسندیدن مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const LikeRecipe = {
    type: ResponseType,
    args: {
        recipeId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { recipeId } = args;
        await checkExistRecipe(recipeId);
        const likeRecipe = await RecipeModel.findOne({_id: recipeId, likes: user._id});
        const dislikeRecipe = await RecipeModel.findOne({_id: recipeId, dislikes: user._id});
        const findQuery = likeRecipe? {$pull: {likes: user._id}}:{$push: {likes: user._id}};
        await RecipeModel.updateOne({_id: recipeId}, findQuery);
        let message;
        if(!likeRecipe){
            if(dislikeRecipe) await RecipeModel.updateOne({_id: recipeId}, {$pull: {dislikes: user._id}})
            message = "پسندیدن دستور پخت با موفقیت انجام شد"
        } else {
            message = "پسندیدن دستور پخت لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }

    }
}
const LikeRecipeVideo = {
    type: ResponseType,
    args: {
        recipeVideoId: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { recipeVideoId } = args;
        await checkExistRecipeVideo(recipeVideoId);
        const likeRecipeVideo = await RecipeVideoModel.findOne({_id: recipeVideoId, likes: user._id});
        const dislikeRecipeVideo = await RecipeVideoModel.findOne({_id: recipeVideoId, dislikes: user._id});
        const findQuery = likeRecipeVideo? {$pull: {likes: user._id}}:{$push: {likes: user._id}};
        await RecipeVideoModel.updateOne({_id: recipeVideoId}, findQuery);
        let message;
        if(!likeRecipeVideo){
            if(dislikeRecipeVideo) await RecipeVideoModel.updateOne({_id: recipeVideoId}, {$pull: {dislikes: user._id}});
            message = "پسندیدن دستور پخت با موفقیت انجام شد"
        } else {
            message = "پسندیدن دستور پخت لغو شد"
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
    LikeBlog,
    LikeRecipe,
    LikeRecipeVideo
}
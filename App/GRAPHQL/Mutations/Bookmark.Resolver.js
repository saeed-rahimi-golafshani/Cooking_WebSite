const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/Verify.AccessToken");
const { checkExistBlog, checkExistRecipe, checkExistRecipeVideo } = require("../Utils");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { RecipeModel } = require("../../Models/Recipe.Model");
const { RecipeVideoModel } = require("../../Models/RecipeVideo.Model");

const BookMarkBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    }, 
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const bookmarkBlog = await BlogModel.findOne({_id: blogId, bookmarks: user._id});
        const updateQuery = bookmarkBlog? {$pull: {bookmarks: user._id}}:{$push: {bookmarks: user._id}};
        await BlogModel.updateOne({_id: blogId}, updateQuery);
        let message;
        if(!bookmarkBlog) {
            message = "مقاله به لیست علاقه مندی های شما اضافه شد" 
        } else {
            message = "مقاله از لیست علاقه مندی های شما حذف شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: { 
                message
            }
        } 
    }
}
const BookMarkRecipe = {
    type: ResponseType,
    args: {
        recipeId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { recipeId } = args;
        await checkExistRecipe(recipeId);
        const bookmarkRecipe = await RecipeModel.findOne({_id: recipeId, bookmarks: user._id});
        const updateQuery = bookmarkRecipe? {$pull: {bookmarks: user._id}}:{$push: {bookmarks: user._id}};
        await RecipeModel.updateOne({_id: recipeId}, updateQuery);
        let message;
        if(!bookmarkRecipe){
            message = "دستور پخت به لیست علاقه مندی های شما اضافه شد" 
        } else {
            message = "دستور پخت از لیست علاقه مندی های شما حذف شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
}
const BookMarkRecipeVideo = {
    type: ResponseType,
    args: {
        recipeVideoId: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { recipeVideoId } = args;
        await checkExistRecipeVideo(recipeVideoId);
        const bookmarkRecipeVideo = await RecipeVideoModel.findOne({_id: recipeVideoId, bookmarks: user._id});
        const updateQuery = bookmarkRecipeVideo? {$pull: {bookmarks: user._id}}:{$push: {bookmarks: user._id}};
        await RecipeVideoModel.updateOne({_id: recipeVideoId}, updateQuery);
        let message;
        if(!bookmarkRecipeVideo){
            message = "دستور پخت به لیست علاقه مندی های شما اضافه شد" 
        } else {
            message = "دستور پخت از لیست علاقه مندی های شما حذف شد"
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
    BookMarkBlog,
    BookMarkRecipe,
    BookMarkRecipeVideo
}
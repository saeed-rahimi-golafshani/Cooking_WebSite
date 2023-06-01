const { GraphQLList, GraphQLString } = require("graphql");
const { RecipeType } = require("../TypeDefs/Recipe.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/Verify.AccessToken");
const { RecipeModel } = require("../../Models/Recipe.Model");
const { RecipeVideoModel } = require("../../Models/RecipeVideo.Model");
const { RecipeVideoType } = require("../TypeDefs/RecipeVideo.Type");
const { BlogType } = require("../TypeDefs/Blog.Type");
const { BlogModel } = require("../../Models/Blog.Model");

const getUserMyRecipe = {
    type: new GraphQLList(RecipeType),
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const myRecipe = await RecipeModel.find({author: user._id});
        return myRecipe
    }
}
const getUserBookmarkRecipe = {
    type: new GraphQLList(RecipeType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const bookmarkRecipe = await RecipeModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "bookmarks"},
            {path: "author"}
        ])
        return bookmarkRecipe
    }
}
const getUserBookmarkRecipeVideo = {
    type: new GraphQLList(RecipeVideoType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const bookmarkRecipeVideo = await RecipeVideoModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "bookmarks"},
            {path: "author"}
        ])
        return bookmarkRecipeVideo
    }
}
const getUserBookmarkBlog = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const bookmarkBlog = await BlogModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "bookmarks"},
            {path: "author"}
        ]) 
        return bookmarkBlog
    }
}
const getUserMyBlog = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const myBlog = await BlogModel.find({author: user._id});
        return myBlog
    }
} 

module.exports = {
    getUserMyRecipe,
    getUserBookmarkRecipe,
    getUserBookmarkRecipeVideo,
    getUserBookmarkBlog,
    getUserMyBlog
}
const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { BlogResolver, ListOfBlogById, ListOfBlogByCategory } = require("./Queries/Blog.Resolver");
const { AllCategoryList, HeadCategoryList, CategoryListById } = require("./Queries/Category.Resolver");
const { RecipeResolver, ListOfRecipeById, ListOfRecipeByCategory, ListOfRecipeByRegion, ListOfLastRecipe } = require("./Queries/Recipe.Resolver");
const { ListOfRecipeVideoResolver, ListOfRecipeVideoLast, ListOfRecipevideoById, LisOfRecipeVideoByCategory, ListOfRecipeVideoByRegion } = require("./Queries/RecipeVideo.Resolver");
const { getUserMyRecipe, getUserBookmarkRecipe, getUserBookmarkRecipeVideo, getUserBookmarkBlog, getUserMyBlog } = require("./Queries/UserProfile.Resolver");
const { CreateCommentForBlog, CreateCommentForRecipe, CreateCommentForRecipeVideo } = require("./Mutations/Comment.Resolver");
const { LikeBlog, LikeRecipe, LikeRecipeVideo } = require("./Mutations/Like.Resolver");
const { DislikeBlog, DislikeRecipe, DislikeRecipeVideo } = require("./Mutations/Dislike.Resolver");
const { BookMarkBlog, BookMarkRecipe, BookMarkRecipeVideo } = require("./Mutations/Bookmark.Resolver");


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        allCategoryList: AllCategoryList,
        headCategoryList: HeadCategoryList,
        categoryListById: CategoryListById,
        blogs: BlogResolver,
        listOfBlogById: ListOfBlogById,
        listOfBlogByCategory: ListOfBlogByCategory,
        recipe: RecipeResolver,
        listOfRecipeById: ListOfRecipeById,
        listOfRecipeByCategory: ListOfRecipeByCategory,
        listOfRecipeByRegion: ListOfRecipeByRegion,
        listOfLastRecipe: ListOfLastRecipe,
        listrecipeVideo: ListOfRecipeVideoResolver,
        listRecipeVideoLast: ListOfRecipeVideoLast,
        listOfRecipevideoById: ListOfRecipevideoById,
        lisOfRecipeVideoByCategory: LisOfRecipeVideoByCategory,
        listOfRecipeVideoByRegion: ListOfRecipeVideoByRegion,
        myRecipe: getUserMyRecipe,
        myBlog: getUserMyBlog,
        bookmarkRecipe: getUserBookmarkRecipe,
        bookmarkRecipeVideo: getUserBookmarkRecipeVideo,
        bookmarkBlog: getUserBookmarkBlog
    }
});
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog: CreateCommentForBlog,
        CreateCommentForRecipe: CreateCommentForRecipe,
        CreateCommentForRecipeVideo: CreateCommentForRecipeVideo,
        LikeBlog: LikeBlog,
        LikeRecipe: LikeRecipe,
        LikeRecipeVideo: LikeRecipeVideo,
        DislikeBlog: DislikeBlog,
        DislikeRecipe: DislikeRecipe,
        DislikeRecipeVideo: DislikeRecipeVideo,
        BookMarkBlog: BookMarkBlog,
        BookMarkRecipe: BookMarkRecipe,
        BookMarkRecipeVideo: BookMarkRecipeVideo

    }
});
const graphQlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    graphQlSchema
}
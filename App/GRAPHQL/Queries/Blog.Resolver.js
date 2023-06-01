const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../TypeDefs/Blog.Type");
const { BlogModel } = require("../../Models/Blog.Model");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/Verify.AccessToken");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async () => {
        return BlogModel.find({}).populate([
            {path: "author"},
            {path: "category"}
        ]);
    }
}
const ListOfBlogById = {
    type: new GraphQLList(BlogType),
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { blogId } = args;
        const blog = await BlogModel.find({_id: blogId}).populate([
            {path: "author"},
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ])
        return blog
    }
}
const ListOfBlogByCategory = {
    type: new GraphQLList(BlogType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async (_, args) =>{
        const { category } = args;
        const findQuery = category? {category}: {};
        const blog = await BlogModel.find(findQuery).populate([
            {path: "author"},
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
        return blog
    }
}

module.exports = {
    BlogResolver,
    ListOfBlogById,
    ListOfBlogByCategory
}
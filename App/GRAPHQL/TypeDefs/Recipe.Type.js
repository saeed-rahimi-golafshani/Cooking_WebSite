const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { RegionType, UserType, PublicCategoryType, ScoreType } = require("./Public.Type");
const { CommentType } = require("./Comment.Type");

const RecipeType = new GraphQLObjectType({
    name: "RecipeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        recipe_number: {type: GraphQLString},
        Region_food: {type: RegionType},
        author: {type: UserType},
        category: {type: PublicCategoryType},
        tags: {type: new GraphQLList(GraphQLString)},
        source: {type: new GraphQLList(GraphQLString)},
        images: {type: new GraphQLList(GraphQLString)},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: UserType},
        dislikes: {type: UserType},
        bookmarks: {type: UserType},
        view: {type: UserType},
        score: {type: new GraphQLList(ScoreType)}
    }
});

module.exports = {
    RecipeType
};
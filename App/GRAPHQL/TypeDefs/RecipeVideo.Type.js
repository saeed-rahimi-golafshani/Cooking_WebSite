const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { PublicCategoryType, EpisodType, RegionType, UserType, ScoreType } = require("./Public.Type");
const { CommentType } = require("./Comment.Type");

const RecipeVideoType = new GraphQLObjectType({
    name: "RecipeVideoType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        category: {type: PublicCategoryType},
        recipe_number: {type: GraphQLInt},
        region_food: {type: RegionType},
        author: {type: UserType},
        source: {type: new GraphQLList(GraphQLString)},
        image: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        episode: {type: new GraphQLList(EpisodType)},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        type: {type: GraphQLString},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: UserType},
        dislikes: {type: UserType},
        bookmarks: {type: UserType},
        view: {type: UserType},
        score: {type: new GraphQLList(ScoreType)}
    }
})

module.exports = {
    RecipeVideoType
}
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./Public.Type");

const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        createAt: {type: GraphQLString},
        show: {type: GraphQLBoolean}
    }
});
const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        opentocomment: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
        answers: {type: new GraphQLList(CommentAnswerType)}
    }
});

module.exports = {
    CommentType
}
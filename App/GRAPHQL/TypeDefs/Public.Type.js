const { GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLEnumType, GraphQLInt } = require("graphql");
const { toObject, parseLiteral } = require("../Utils");

const AnyType = new GraphQLScalarType({
    name: "AnyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral
})
const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString}
    }
});
const PublicCategoryType = new GraphQLObjectType({
    name: "PublicCategoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString}
    }
});
const RegionType = new GraphQLObjectType({
    name: "RegionType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString}
    }
});
const ScoreType = new GraphQLObjectType({
    name: "ScoreType",
    fields: {
        Score: {type: UserType},
        score_number: {type: GraphQLInt}
    }
});
const EpisodType = new GraphQLObjectType({
    name: "EpisodType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        videoAddress: {type: GraphQLString}
    }
});
const ResponseType = new GraphQLObjectType({
    name: "ResponseType",
    fields: {
        statusCode: {type: GraphQLString},
        data: {type: AnyType}
    }
})

module.exports = {
    AnyType,
    UserType,
    PublicCategoryType,
    RegionType,
    ScoreType,
    EpisodType,
    ResponseType
}
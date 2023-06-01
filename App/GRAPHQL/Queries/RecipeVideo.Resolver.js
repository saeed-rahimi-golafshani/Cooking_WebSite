const { GraphQLList, GraphQLString } = require("graphql");
const { RecipeVideoType } = require("../TypeDefs/RecipeVideo.Type");
const { RecipeVideoModel } = require("../../Models/RecipeVideo.Model");

const ListOfRecipeVideoResolver = {
    type: new GraphQLList(RecipeVideoType),
    resolve: async () => {
        const RecipeVideo = await RecipeVideoModel.find({}).populate([
            {path: "category"},
            {path: "author"},
            {path: "region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
        return RecipeVideo
    }
};
const ListOfRecipeVideoLast = {
    type: new GraphQLList(RecipeVideoType),
    resolve: async () =>{
        const recipeVideo = await RecipeVideoModel.find({}).populate([
            {path: "category"},
            {path: "author"},
            {path: "region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]).sort({_id: -1})
        return recipeVideo
    }
};
const ListOfRecipevideoById = {
    type: new GraphQLList(RecipeVideoType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async (_, args) =>{
        const { id } = args;
        const recipeVideo = await RecipeVideoModel.find({_id: id}).populate([
            {path: "category"},
            {path: "author"},
            {path: "region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}    
        ]);
        return recipeVideo
    }
};
const LisOfRecipeVideoByCategory= {
    type: new GraphQLList(RecipeVideoType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async(_, args) =>{
        const { category } = args;
        const recipeVideo = await RecipeVideoModel.find({category}).populate([
            {path: "category"},
            {path: "author"},
            {path: "region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
        return recipeVideo
    }
};
const ListOfRecipeVideoByRegion = {
    type: new GraphQLList(RecipeVideoType),
    args: {
        region: {type: GraphQLString}
    },
    resolve: async (_, args) =>{
        const { region } = args;
        return await RecipeVideoModel.find({region_food: region}).populate([
            {path: "category"},
            {path: "author"},
            {path: "region_food"},
            {path: 'comments.user'},
            {path: "comments.answers.user"}
        ])
    }
}

module.exports = {
    ListOfRecipeVideoResolver,
    ListOfRecipeVideoLast,
    ListOfRecipevideoById,
    LisOfRecipeVideoByCategory,
    ListOfRecipeVideoByRegion
}
const { GraphQLList, GraphQLString } = require("graphql");
const { RecipeType } = require("../TypeDefs/Recipe.Type");
const { RecipeModel } = require("../../Models/Recipe.Model");

const RecipeResolver = {
    type: new GraphQLList(RecipeType),
    resolve: async () =>{
        return await RecipeModel.find({}).populate([
            {path: "category"},
            {path: "Region_food"},
            {path: "author"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
    }
};
const ListOfRecipeById = {
    type: new GraphQLList(RecipeType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { id } = args;
        const Recipe = await RecipeModel.find({_id: id}).populate([
            {path: "category"},
            {path: "author"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "Region_food"}
        ]);
        return Recipe
    }
}
const ListOfRecipeByCategory = {
    type: new GraphQLList(RecipeType),
    args: {
        categoryId: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { categoryId } = args;
            const recipe = await RecipeModel.find({category: categoryId}).populate([
            {path: "category"},
            {path: "author"},
            {path: "Region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
        return recipe
    }
};
const ListOfRecipeByRegion = {
    type: new GraphQLList(RecipeType),
    args: {
        regionId: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { regionId } = args;
        const recipe = await RecipeModel.find({Region_food: regionId}).populate([
            {path: "category"},
            {path: "author"},
            {path: "Region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
        return recipe
    }
    
}
const ListOfLastRecipe = {
    type: new GraphQLList(RecipeType),
    resolve: async () =>{
        const lastRecipe = await RecipeModel.find({}).populate([
            {path: "category"},
            {path: "author"},
            {path: "Region_food"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]).sort({_id: -1});
        return lastRecipe
    }
}

module.exports = {
    RecipeResolver,
    ListOfRecipeById,
    ListOfRecipeByCategory,
    ListOfRecipeByRegion,
    ListOfLastRecipe
}
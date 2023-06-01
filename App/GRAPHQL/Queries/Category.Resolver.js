const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryType } = require("../TypeDefs/Category.Type");
const { CategoryModel } = require("../../Models/Category.Model");

const AllCategoryList = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        const category = await CategoryModel.find({});
        return category
    }
};
const HeadCategoryList = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        const category = await CategoryModel.find({parent: undefined})
        return category
    }
}
const CategoryListById = {
    type: new GraphQLList(CategoryType),
    args: { parent: {type: GraphQLString} },
    resolve: async (_, args) => {
        const { parent } = args;
        const category = await CategoryModel.find({parent});
        return category;
    }
}

module.exports = {
    AllCategoryList,
    HeadCategoryList,
    CategoryListById
}
const { Kind } = require("graphql");
const { default: mongoose } = require("mongoose");
const { CategoryModel } = require("../Models/Category.Model");
const createHttpError = require("http-errors");
const { BlogModel } = require("../Models/Blog.Model");
const { RecipeModel } = require("../Models/Recipe.Model");
const { RecipeVideoModel } = require("../Models/RecipeVideo.Model");

function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    }
}
function parseLiteral(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{'? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT: 
                
    }
}
function toObject(value){
    if(typeof value === 'object'){
        return value
    }
    if(typeof value === "string" && value.charAt(0) === "{"){
        return JSON.parse(value)
    }
    return null
}
async function checkExistCategory(field){
    let findQuery = mongoose.isValidObjectId(field)? {_id: field}:{title: field};
    const category = await CategoryModel.findOne(findQuery)
    if(!category) throw new createHttpError.NotFound("دسته بندی یافت نشد")
    return category
}
async function checkExistBlog(id){
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه برای مقاله اشتباه است")
    const blog = await BlogModel.findById(id);
    if(!blog) throw createHttpError.NotFound("مقاله مورد نظر یافت نشد")
    return blog
}
async function checkExistRecipe(id){
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const recipe = await RecipeModel.findById(id);
    if(!recipe) throw createHttpError.NotFound("دستور پخت مورد نظر یافت نشد");
    return recipe
}
async function checkExistRecipeVideo(id){
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const recipeVideo = await RecipeVideoModel.findById(id); 
    if(!recipeVideo) throw createHttpError.NotFound("گزینه مورد نظر یافت نشد");
    return recipeVideo
}

module.exports = {
    parseObject,
    parseValueNode,
    parseLiteral,
    toObject,
    checkExistCategory,
    checkExistBlog,
    checkExistRecipe,
    checkExistRecipeVideo
}
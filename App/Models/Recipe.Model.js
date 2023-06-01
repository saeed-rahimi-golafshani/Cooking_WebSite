const { default: mongoose } = require("mongoose");
const { commentModel } = require("./Comments.Model");

const ScoreSchema = new mongoose.Schema({
    Score: {type: mongoose.Types.ObjectId, ref: "user"},
    score_number: {type: Number, default: 1}
})
const RecipeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    recipe_number: {type: String, required: true, default: 0},
    Region_food: {type: mongoose.Types.ObjectId, required: true, ref: "city"},
    author: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    tags: {type: [String], default: []},
    source: {type: [String], default: []},
    images: {type: [String], default: []},
    comments: {type: [commentModel], default: []},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    bookmarks: {type: mongoose.Types.ObjectId, ref: "user"},
    view: {type: mongoose.Types.ObjectId, ref: "user"},
    score: {type: [ScoreSchema], default: []}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
RecipeSchema.index({title: "text", short_text: "text"});
RecipeSchema.virtual("user", {
    ref: "user",
    localField: "_id",
    foreignField: "author"
});
RecipeSchema.virtual("category_details", {
    ref: "category",
    localField: "_id",
    foreignField: "category"
});
RecipeSchema.virtual("city", {
    ref: "city",
    localField: "_id",
    foreignField: "Region_food"
})
module.exports ={
    RecipeModel: mongoose.model("recipe", RecipeSchema)
}
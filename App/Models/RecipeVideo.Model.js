const { default: mongoose } = require("mongoose");
const { commentModel } = require("./Comments.Model");

const ScoreSchema = new mongoose.Schema({
    Score: {type: mongoose.Types.ObjectId, ref: "user"},
    score_number: {type: Number, default: 1}
});
const Episode = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "unlock"},
    time: {type: String, required: true},
    videoAddress: {type: String, required: true}
}, {
    toJSON: {
        virtuals: true
    }
});
Episode.virtual("videoAddressURL").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
});
const RecipeVideoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    recipe_number: {type: Number, required: true, default: 0},
    region_food: {type: mongoose.Types.ObjectId, ref: "city", required: true},
    author: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    source: {type: [String], default: []},
    image: {type: String, default: []},
    tags: {type: [String], default: []},
    episode: {type: [Episode], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: String, default: "free", required: true},
    comments: {type: [commentModel], default: []},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    bookmarks: {type: mongoose.Types.ObjectId, ref: "user"},
    view: {type: mongoose.Types.ObjectId, ref: "user"},
    score: {type: [ScoreSchema], default: []},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
 

module.exports ={
    RecipeVideoModel: mongoose.model("recipevideo", RecipeVideoSchema)
}
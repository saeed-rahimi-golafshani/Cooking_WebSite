const { default: mongoose } = require("mongoose");
const { commentModel } = require("../Models/Comments.Model")

const BlogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true, default: []},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], ref: "category", required: true},
    source: {type: [String], default: []},
    comments: {type: [commentModel], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    view: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
BlogSchema.virtual("user",{
    ref: "user",
    localField: "_id",
    foreignField: "author"
});
BlogSchema.virtual("category_detail",{
    ref: "category",
    localField: "_id",
    foreignField: "category"
});

module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
}
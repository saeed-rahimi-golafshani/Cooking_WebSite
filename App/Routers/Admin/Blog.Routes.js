const { AdminBlogController } = require("../../Http/Controller/Admin/Blog/Blog.controller");
const { stringToArray } = require("../../Http/Middlewares/StringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile.array("Image_Blog", 5), stringToArray("tags"),stringToArray("category"), stringToArray("source"), AdminBlogController.createBlog);
router.get("/list", AdminBlogController.listOfBlog);
router.get("/list/:id", AdminBlogController.listOfBlogById);
router.patch("/update/:id", uploadFile.array("Image_Blog", 5), stringToArray("tags"),stringToArray("category"), stringToArray("source"), AdminBlogController.updateBlog)
router.delete("/remove/:id", AdminBlogController.removeBlog);

module.exports = {
    AdminApiBlogRoutes: router
}
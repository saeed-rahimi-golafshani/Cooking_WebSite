const { string } = require("joi");
const { AdminRecipeVideoController } = require("../../Http/Controller/Admin/Recipe_Video/RecipeVideo.Controller");
const { stringToArray } = require("../../Http/Middlewares/StringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile.single("Image_RecipeVideo"), stringToArray("tags"), stringToArray("source"), AdminRecipeVideoController.createRecipeVideo)
router.get("/list", AdminRecipeVideoController.listOfRecipeVideo);
router.get("/list/:id", AdminRecipeVideoController.listOfRecipeVideoById);
router.patch("/update/:id", uploadFile.single("Image_RecipeVideo"), stringToArray("tags"), stringToArray("source"), AdminRecipeVideoController.updateRecipeVideo);
router.delete("/remove/:id", AdminRecipeVideoController.deleteRecipeVideo);

module.exports ={
    AdminApiRecipeVideo: router
}
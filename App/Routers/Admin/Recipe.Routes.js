const { AdminRecipeController } = require("../../Http/Controller/Admin/Recipe/Recipe.Controller");
const router = require("express").Router();
const { uploadFile } = require("../../Utills/Multer");
const { stringToArray } = require("../../Http/Middlewares/StringToArray")

router.post("/create", uploadFile.array("Image_Recipe", 10), stringToArray("tags"), stringToArray("source"), AdminRecipeController.createRecipe);
router.get("/list", AdminRecipeController.listRecipe);
router.get("/list/:id", AdminRecipeController.listRecipeById);
router.patch("/update/:id", uploadFile.array("Image_Recipe"), stringToArray("tags"), stringToArray("source"), AdminRecipeController.updateRecipe);
router.delete("/delete/:id", AdminRecipeController.removeRecipe);

module.exports = {
    AdminApiRecipeRoutes: router
}
const { AdminRecipeEpisodeController } = require("../../Http/Controller/Admin/Recipe_Video/RecipeEpisode.Controller");
const { uploadVideo } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadVideo.single("Video_Recipe"), AdminRecipeEpisodeController.createEpisode)
router.patch("/update/:episodeId", uploadVideo.single("Video_Recipe"), AdminRecipeEpisodeController.updateEpisode)
router.delete("/remove/:episodeId", AdminRecipeEpisodeController.removeEpisode);

module.exports = {
    AdminApiRecipeEpisode: router
}
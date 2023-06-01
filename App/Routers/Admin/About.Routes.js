const router = require("express").Router();
const { AdminAboutController } = require("../../Http/Controller/Admin/About/About.Controller");
const { uploadFile } = require("../../Utills/Multer")

router.post("/create", uploadFile.single("Image_About"), AdminAboutController.createAbout);
router.get("/list", AdminAboutController.listAbout);
router.patch("/update/:id", uploadFile.single("Image_About"), AdminAboutController.updateAbout);
router.delete("/delete/:id", AdminAboutController.removeAbout);

module.exports = {
    AdminApiAboutRoutes: router
}
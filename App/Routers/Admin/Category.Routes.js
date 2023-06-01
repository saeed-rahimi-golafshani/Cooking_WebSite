const { AdminCategoryController } = require("../../Http/Controller/Admin/Category/Category.Controller");

const router = require("express").Router();

router.post("/create", AdminCategoryController.createCategory);
router.get("/list", AdminCategoryController.listOfCategoryWithoutParent);
router.get("/list-all-category", AdminCategoryController.listOfAllCategory);
router.get("/list-child-parent/:parent", AdminCategoryController.listChaildOfParent);
router.patch("/update/:id", AdminCategoryController.updateCategory);
router.delete("/remove/:id", AdminCategoryController.removeCategory);

module.exports = {
    AdminApiCategoryRoutes: router
}
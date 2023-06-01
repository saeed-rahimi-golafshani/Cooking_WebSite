const { AdminCityController } = require("../../Http/Controller/Admin/City/City.Controller")
const router = require("express").Router()

router.post("/create", AdminCityController.createCity);
router.get("/list", AdminCityController.listCity);
router.patch("/update/:id", AdminCityController.updateCityById);
router.delete("/remove/:id", AdminCityController.removeCityById);

module.exports = {
    AdminApiCityRoutes: router
}
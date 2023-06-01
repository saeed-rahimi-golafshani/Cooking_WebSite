const { AdminRoleController } = require("../../Http/Controller/Admin/RBAC/Role.Controller");
const router = require("express").Router();
const { stringToArray } = require("../../Http/Middlewares/StringToArray")

router.post("/create", stringToArray("permissions"), AdminRoleController.createRole)
router.get("/list",AdminRoleController.listOfRole);
router.patch("/update/:id", stringToArray("permissions"), AdminRoleController.updateRole);
router.delete("/remove/:field", AdminRoleController.removeRole);

module.exports = {
    AdminApiRoleRoutes: router
}
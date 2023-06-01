const { AdminPermissionController } = require("../../Http/Controller/Admin/RBAC/Permission.Contriller");
const router = require("express").Router();

router.post("/create", AdminPermissionController.createPermission);
router.get("/list", AdminPermissionController.listOfPermission);
router.patch("/update/:id", AdminPermissionController.updatePermission);
router.delete("/remove/:id", AdminPermissionController.removePermission);

module.exports = {
    AdminApiPermissionRoutes: router
}
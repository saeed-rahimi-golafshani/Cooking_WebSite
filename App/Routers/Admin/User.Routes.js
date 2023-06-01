const router = require("express").Router();
const { AdminUserController } = require("../../Http/Controller/Admin/User/User.Controller")

router.get("/list", AdminUserController.listOfUser);
router.patch("/update-profile", AdminUserController.updateUser);
router.get("/profile", AdminUserController.profileUser);

module.exports = {
    AdminApiUserRoutes: router
}
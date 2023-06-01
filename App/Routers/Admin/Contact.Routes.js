const { AdminContactController } = require("../../Http/Controller/Admin/Contact/Contact.Controller");
const router = require("express").Router();

router.post("/create", AdminContactController.createContact);
router.get("/list", AdminContactController.listOfContact);
router.patch("/update/:id", AdminContactController.updateContact);
router.delete("/delete/:id", AdminContactController.deleteContact);

module.exports = {
    AdminApiContactRoutes: router
}
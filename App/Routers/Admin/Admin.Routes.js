const router = require("express").Router();
const { checkPermission } = require("../../Http/Middlewares/PermissionGuard");
const { PERMISSIONS } = require("../../Utills/Constants");
const { AdminApiAboutRoutes } = require("./About.Routes");
const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { AdminApiCategoryRoutes } = require("./Category.Routes");
const { AdminApiCityRoutes } = require("./City.Routes");
const { AdminApiContactRoutes } = require("./Contact.Routes");
const { AdminApiPermissionRoutes } = require("./Permission.Routes");
const { AdminApiRecipeRoutes } = require("./Recipe.Routes");
const { AdminApiRecipeVideo } = require("./RecipeVideo.Routes");
const { AdminApiRecipeEpisode } = require("./RecipeVideoEpisode.Routes");
const { AdminApiRoleRoutes } = require("./Role.Routes");
const { AdminApiUserRoutes } = require("./User.Routes");

router.use("/about", 
checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CONTENT_MANAGER
    ]),AdminApiAboutRoutes);
router.use("/category", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CONTENT_MANAGER
    ]), AdminApiCategoryRoutes);
router.use("/contact", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CONTENT_MANAGER
    ]),AdminApiContactRoutes);
router.use("/blog", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CONTENT_MANAGER,
        PERMISSIONS.AUTHOR, 
        PERMISSIONS.CHEF
    ]), AdminApiBlogRoutes);
router.use("/region_categories", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CONTENT_MANAGER
    ]), AdminApiCityRoutes)
router.use("/recipe", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL,
        PERMISSIONS.AUTHOR, 
        PERMISSIONS.CHEF
    ]), AdminApiRecipeRoutes)
router.use("/recipe_video", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CHEF
    ]), AdminApiRecipeVideo)
router.use("/recipe_episode", checkPermission(
    [
        PERMISSIONS.ADMIN, 
        PERMISSIONS.ALL, 
        PERMISSIONS.CHEF
    ]), AdminApiRecipeEpisode)
router.use("/user", checkPermission(
    [
        PERMISSIONS.USER
    ]), AdminApiUserRoutes);
router.use("/role", checkPermission(
    [ 
        PERMISSIONS.ALL
    ]), AdminApiRoleRoutes);
router.use("/permission", checkPermission(
    [ 
        PERMISSIONS.ALL
    ]), AdminApiPermissionRoutes)

module.exports = {
    AdminRoutes: router
}
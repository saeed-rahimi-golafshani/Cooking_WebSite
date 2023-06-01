const HomeController = require("../../Http/Controller/Api/Home.Controller");
const { verifyAccessToken } = require("../../Http/Middlewares/Verify.AccessToken");
const router = require("express").Router();

router.get("/", HomeController.indexPage)

module.exports ={ 
    IndexApiRoutes: router
}
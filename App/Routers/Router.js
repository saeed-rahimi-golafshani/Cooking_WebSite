const { IndexApiRoutes } = require("./Api/Index.Routes");
const { AuthenticationRoutes } = require("./User/Authentication.Routes");
const { AdminRoutes } = require("./Admin/Admin.Routes");
const { verifyAccessToken } = require("../Http/Middlewares/Verify.AccessToken")
const redisClient = require("../Utills/Init.Redis");
const router = require("express").Router();
(async() =>{
    await redisClient.set("key", "value")
    const value = await redisClient.get("key");
    console.log(value);
})();
const { graphqlHTTP } = require("express-graphql");
const { graphQlConfig } = require("../Utills/GraphQl.Config")

router.use("/", IndexApiRoutes);
router.use("/users", AuthenticationRoutes);
router.use("/admin", verifyAccessToken, AdminRoutes);
router.use("/GraphQl", graphqlHTTP(graphQlConfig));


module.exports = {
    AllApiRoutes: router 
}
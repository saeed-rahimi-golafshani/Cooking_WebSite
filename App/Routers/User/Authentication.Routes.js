const { AuthenticationController } = require("../../Http/Controller/User/Authentication/Authentication");
const router = require("express").Router();

router.post("/login-otp", AuthenticationController.loginWithOtp);
router.post("/check-login", AuthenticationController.checkLogin);
router.post("/refresh-token", AuthenticationController.refreshToken);

module.exports = {
    AuthenticationRoutes: router
}
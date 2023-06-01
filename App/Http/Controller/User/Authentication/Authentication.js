const Controller = require("../../Controlle");
const { UserModel } = require("../../../../Models/User.Model");
const { ROLES } = require("../../../../Utills/Constants");
const { loginWithOtpSchema, checkLoginSchema } = require("../../../Validations/User/Authentication.Schema");
const { randomNumberFiveDigitsGenerator } = require("../../../../Utills/Function");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { smsClient } = require("../../../../Utills/Sms.Panel");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../../../../Utills/Token");

class AuthenticationController extends Controller{
    async loginWithOtp(req, res, next){
        try {
            await loginWithOtpSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = randomNumberFiveDigitsGenerator();
            const result = await this.saveUser(mobile, code);
            if(!result) throw new createHttpError.InternalServerError("خطای سروری از سرآشپز")
            // await smsClient(mobile, code);
            return res.status(httpStatus.OK).send({
                statusCode: httpStatus.OK,
                data: {
                    message: "رمز یکبار مصرف ارسال گردید", 
                    code // بعدا حذف گردد
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile, code){
        let otp= {
            code,
            expiresIn: (new Date().getTime() + (process.env.OTP_EXPIRESIN))
        };
        const result = await this.checkExistUser(mobile);
        if(result){
           return await this.updateUser(mobile, {otp})
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles: ROLES.USER
        }))
        
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user;
    }
    async updateUser(mobile, dataObject={}){
        const nullish = ["", " ", null, NaN, undefined, 0];
        Object.keys(dataObject).forEach(key =>{
            if(nullish.includes(dataObject[key])) delete dataObject[key] 
        });
        const updateResult = await UserModel.updateOne({mobile}, {$set: dataObject})
        return !!updateResult.modifiedCount        
    }
    async checkLogin(req, res, next){
        try {
            await checkLoginSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) throw new createHttpError.NotFound("کاربر مورد نظر یافت نشد");
            if(user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد");
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد تایید منقضی شد");
            const accesstoken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id)
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accesstoken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next){
        try {
            const { refreshToken } = req.body;
            const mobile = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    AuthenticationController: new AuthenticationController()
}
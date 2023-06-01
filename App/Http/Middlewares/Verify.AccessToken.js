const jwt = require("jsonwebtoken");
const { ACCESS_Token_SECRETKEY } = require("../../Utills/Constants");
const createHttpError = require("http-errors");
const { UserModel } = require("../../Models/User.Model");
const { getToken } = require("../../Utills/Function");

function verifyAccessToken(req, res, next){
    try {
        const token = getToken(req.headers);
        jwt.verify(token, ACCESS_Token_SECRETKEY, (async(err, payload) =>{
        try {
            if(err) throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
            const { mobile } = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if(!user) throw createHttpError.NotFound("حساب کاربری یافت نشد");
            req.user = user;
            return next()
        } catch (error) {
            next(error)
        } 
    }))
    } catch (error) {
        next(error)
    }
}
async function verifyAccessTokenInGraphQL(req, res){
    try {
        const token = getToken(req.headers);
        const { mobile } = jwt.verify(token, ACCESS_Token_SECRETKEY)
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
        return user
      } catch (error) {
        throw new createHttpError.Unauthorized()
      }
}

module.exports = { 
    verifyAccessToken,
    verifyAccessTokenInGraphQL
}
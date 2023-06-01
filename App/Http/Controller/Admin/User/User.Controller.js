const createHttpError = require("http-errors");
const { UserModel } = require("../../../../Models/User.Model");
const Controller = require("../../Controlle");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../Utills/Function");
const userBlackList = {
    MOBILE: "mobile",
    OTP: "otp",
    BILLS: "bills",
    DISCOUNT: "discount",
    ROLES: "roles",
    RECIPE: "Recipe",
    RECIPEVIDEO: "RecipeVideo"
}
Object.freeze(userBlackList)

class AdminUserController extends Controller{
    async listOfUser(req, res, next){
        try {
            const { search } = req.query;
            const databaseQuery = {};
            let users;
            if(search){
                databaseQuery["$text"] = {$search: search};
                users = await UserModel.findOne(databaseQuery)
            } else{
                users = await UserModel.find({});
            }
            console.log(databaseQuery);
            if(!users) throw new createHttpError.NotFound("کاربری یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUser(req, res, next){
        try {
            const userId = req.user._id;
            const data = copyObject(req.body);
            let blackListFeilds = Object.values(userBlackList)
            deleteInvalidPropertyInObject(data, blackListFeilds);
            const updateResault = await UserModel.updateOne({_id: userId}, {$set: data});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "پروفایل کاربری با موفقیت به روز رسانی شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async profileUser(req, res, next){
        try {
            const user = req.user;
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminUserController: new AdminUserController()
}
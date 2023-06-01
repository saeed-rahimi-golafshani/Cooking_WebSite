const createHttpError = require("http-errors");
const { PermissionModel } = require("../../../../Models/Permission.Model");
const { createPermissionSchema } = require("../../../Validations/Admin/Role.Schema");
const Controller = require("../../Controlle");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { objectCopy, deleteInvalidPropertyInObject } = require("../../../../../../../Project-learning/Stor_Project2/App/Utils/functions");

class AdminPermissionController extends Controller{
    async createPermission(req, res, next){
        try {
            const { name, description } = await createPermissionSchema.validateAsync(req.body);
            await this.checkExistName(name);
            const createResault = await PermissionModel.create({name, description});
            if(!createResault) throw new createHttpError.InternalServerError("خطای سروری")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "سطح دسترسی با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfPermission(req, res, next){
        try {
            const permissions = await PermissionModel.find({}, {__v: 0});
            if(!permissions) throw new createHttpError.NotFound("سطوح دسترسی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    permissions
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updatePermission(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistPermissionById(id);
            const data = objectCopy(req.body);
            deleteInvalidPropertyInObject(data, []);
            const updateResault = await PermissionModel.updateOne({_id: id}, {$set: data});
            if(!updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async removePermission(req, res, next){
        try {
            const { id } = req.params;
            const permission = await this.checkExistPermissionById(id);
            const removeResault = await PermissionModel.deleteOne({_id: permission._id});
            if(removeResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "سطح دسترسی با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistName(per_name){
        const permission = await PermissionModel.findOne({name: per_name});
        if(permission) throw new createHttpError.BadRequest("سطح دسترسی از قبل ثبت شده است")
        return permission
    }
    async checkExistPermissionById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه سطح دسترسی اشتباه است");
        const permission = await PermissionModel.findById(id);
        if(!permission) throw new createHttpError.NotFound("سطح دسترسی یافت نشد");
        return permission;
    }
}

module.exports = {
    AdminPermissionController: new AdminPermissionController()
}
const Controller = require("../../Controlle");
const { createRoleSchema } = require("../../../Validations/Admin/Role.Schema");
const { RoleModel } = require("../../../../Models/Role.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../Utills/Function");

class AdminRoleController extends Controller{
    async createRole(req, res, next){
        try {
            const requestDataBody = await createRoleSchema.validateAsync(req.body);
            const {title, permissions, description} = requestDataBody;
            await this.checkExistRoleByTitle(title);
            const createResault = await RoleModel.create({title, permissions, description});
            if(!createResault) throw new createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "نقش کاربری با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfRole(req, res, next){
        try {
            const roles = await RoleModel.aggregate([
                {$match: {}},
                {$lookup: {
                    from: "permissions",
                    localField: "permissions",
                    foreignField: "_id",
                    as: "permissions"
                }},
                {
                    $project: {
                        "permissions.__v": 0,
                        "__v": 0
                    }
                }
            ]).sort({_id: -1});
            if(!roles) throw new createHttpError.NotFound("نقش کاربری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    roles
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateRole(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.checkExistRoleByTitleOrId(id);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, []);
            const updateResault = await RoleModel.updateOne({_id: role._id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "نقش کاربری با موفقیت به روز رسانی شد"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async removeRole(req, res, next){
        try {
            const { field } = req.params;
            const role = await this.checkExistRoleByTitleOrId(field);
            const removeResault = await RoleModel.deleteOne({_id: role._id});
            if(removeResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "نقش کاربری با موفقیت حذف گردید"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistRoleByTitle(title){
        const role = await RoleModel.findOne({title});
        if(role) throw new createHttpError.BadRequest("نقش کاربری مورد نظر از قبل موجود است")
        return role
    }
    async checkExistRoleByTitleOrId(field){
        let findQuery = mongoose.isValidObjectId(field)?{_id: field}:{title: field};
        const role = await RoleModel.findOne(findQuery);
        if(!role) throw createHttpError.NotFound("نقش کاربری مورد نظر یافت نشد")
        return role;
    }
}

module.exports = {
    AdminRoleController: new AdminRoleController()
}
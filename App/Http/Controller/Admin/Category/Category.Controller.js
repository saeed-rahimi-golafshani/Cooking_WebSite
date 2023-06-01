const Controller = require("../../Controlle");
const { createCategorySchema, listCategorySchema, updateCategorySchema } = require("../../../Validations/Admin/Category.Schema");
const { CategoryModel } = require("../../../../Models/Category.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

class AdminCategoryController extends Controller{
    async createCategory(req, res, next){
        try {
            await createCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            await this.checkCategoryWithTitle(title);
            const createCategory = await CategoryModel.create({title, parent});
            if(!createCategory) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "دسته بندی با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async listOfCategoryWithoutParent(req, res, next){
        try {
            const category = await CategoryModel.find({parent: undefined});
            if(!category) throw createHttpError.NotFound("دسته بندی ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfAllCategory(req, res, next){
        try {
            const allCategory = await CategoryModel.find({});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    allCategory
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listChaildOfParent(req, res, next){
        try {
            await listCategorySchema.validateAsync(req.params);
            const { parent } = req.params;
            const parents = await CategoryModel.find({parent}, {__v: 0, updatedAt: 0});
            if(!parents) throw createHttpError.NotFound("شناسه مورد نظر یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    parents
                }
        })
        } catch (error) {
            next(error)
        }
    }
    async updateCategory(req, res, next){
        try {
            const { id } = req.params;
            await this.checkCategoryWithId(id);
            const data = req.body;
            await updateCategorySchema.validateAsync(data);
            Object.keys(data).forEach(key => {
                const nullish = ["", " ", 0, null, NaN, undefined];
                if(nullish.includes(data[key])) delete data[key]
            });
            console.log(data);
            const updateResault = await CategoryModel.updateOne({_id: id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دسته بندی با موفقیت به روز رسانی شد"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const { id } = req.params;
            const category = await this.checkCategoryWithId(id);
            const deleteResault = await CategoryModel.deleteMany({$or: [
                {_id: category._id},
                {parent: category._id}
            ]});
            if(deleteResault.deletedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "حذف دسته بندی با موفقیت انجام شد"
                }
            });
            
        } catch (error) {
            next(error)
        }
    }
    async checkCategoryWithTitle(title){
        const category = await CategoryModel.findOne({title});
        if(category) throw createHttpError.BadRequest("عنوان دسته بندی از قبل ثبت شده است");
        return !!category
    }
    async checkCategoryWithId(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه دسته بندی اشتباه است");
        const category = await CategoryModel.findById(id);
        if(!category) throw createHttpError.NotFound("دسته بندی مورد نظر یافت نشد");
        return category
    }
}

module.exports = {
    AdminCategoryController: new AdminCategoryController()
}
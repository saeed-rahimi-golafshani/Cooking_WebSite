const Controller = require("../../Controlle");
const { createAboutSchema, updateAboutSchema } = require("../../../Validations/Admin/About.Schema");
const path = require("path");
const { AboutModel } = require("../../../../Models/About.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { deleteFileInPath } = require("../../../../Utills/Function");
const { default: mongoose } = require("mongoose");

class AdminAboutController extends Controller{
    async createAbout(req, res, next){
        try {
            const aboutDataBody = await createAboutSchema.validateAsync(req.body);
            req.body.image = path.join(aboutDataBody.fileUploadPath, aboutDataBody.filename);
            req.body.image = req.body.image.replace(/\\/g, "/");
            const image = req.body.image
            const { title, text, category } = req.body;
            const createResault = await AboutModel.create({title, text, image, category});
            if(!createResault) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "اطلاعات در باره ما با موفقیت ثبت گردید"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async listAbout(req, res, next){
        try {
            const about = await AboutModel.find({});
            if(!about) throw createHttpError.NotFound("آیتم مورد نظر یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    about
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async updateAbout(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistAbout(id);
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
                req.body.image = req.body.image.replace(/\\/g, "/");
            }
            const data = req.body;
            // await updateAboutSchema.validateAsync(data);
            const nullishData = ["", " ", 0, NaN, null, undefined];
            Object.keys(data).forEach(key => {
                if(nullishData.includes(data[key])) delete data[key]
            });
            const updateResault = await AboutModel.updateOne({_id: id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "آیتم مورد نظر با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            deleteFileInPath(req?.body?.image)  
            next(error)
        }
    }
    async removeAbout(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistAbout(id);
            const deleteResault = await AboutModel.deleteOne({_id: id});
            if(deleteResault.deletedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز، آیتم مورد نظر حذف نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "آیتم مورد نظر با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistAbout(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است")
        const about = await AboutModel.findById(id);
        if(!about) throw createHttpError.NotFound("آیتم مورد نظر یافت نشد");
        return about
    }
};

module.exports = {
    AdminAboutController: new AdminAboutController()
}
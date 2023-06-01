const Controller = require("../../Controlle");
const { createContactSchema } = require("../../../Validations/Admin/Contact.Schema");
const { ContactModel } = require("../../../../Models/Contact.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { default: mongoose } = require("mongoose");

class AdminContactController extends Controller{
    async createContact(req, res, next){
        try {
            const contact = await createContactSchema.validateAsync(req.body);
            const { phone, email, address, fax } = contact;
            const createResault = await ContactModel.create({phone, email, address, fax});
            if(!createResault) throw createHttpError.InternalServerError("خطای سروری از سرآشپز")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "آیتم تماس با ما با موفقیت ثبت گردید"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfContact(req, res, next){
        try {
            const contact = await ContactModel.find({});
            if(!contact) throw createHttpError.NotFound("آیتم مورد نظر یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    contact
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateContact(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistContact(id);
            const data = req.body;
            const nullishData = ["", " ", NaN, null, undefined, 0];
            Object.keys(data).forEach(key => {
                if(nullishData.includes(data[key])) delete data[key]
            });
            const updateResault = await ContactModel.updateOne({_id: id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "آیتم مورد نظر با موفقیت به روزرسانی شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async deleteContact(req, res, next){
        try {
            const { id } = req. params;
            await this.checkExistContact(id);
            const deleteResault = await ContactModel.deleteOne({_id: id});
            if(deleteResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "آیتم مورد نظر با موفقیت حذف شد"
                }
            });
        } catch (error) {
            
        }
    }
    async checkExistContact(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه وارد شده صحیح نمباشد");
        const contact = await ContactModel.findById(id);
        if(!contact) throw createHttpError.NotFound("ایتم مورد نظر یافت نشد");
        return contact;
    }
}

module.exports = {
    AdminContactController: new AdminContactController()
}
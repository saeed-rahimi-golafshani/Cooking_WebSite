const createHttpError = require("http-errors");
const { createCitySchema } = require("../../../Validations/Admin/City.Schema");
const Controller = require("../../Controlle");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CityModel } = require("../../../../Models/City.Model");
const { default: mongoose } = require("mongoose");

class AdminCityController extends Controller{
    async createCity(req, res, next){
        try {
            const cityDatabody = await createCitySchema.validateAsync(req.body);
            const { title } = cityDatabody;
            const createResault = await CityModel.create({title});
            if(!createResault) throw createHttpError.InternalServerError("عنوان ثبت نشد")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "عنوان منطقه ای با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listCity(req, res, next){
        try {
            const cities = await CityModel.find({}, {__v: 0});
            if(!cities) throw createHttpError.NotFound("منطقه ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    Regions: cities
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateCityById(req, res, next){
        try {
            const { id } = req.params;
            const city = await this.checkExistCity(id);
            const data = req.body;
            let nullishData = ["", " ", 0, null, NaN, undefined];
            Object.keys(data).forEach(key => {
                if(nullishData.includes(data[key])) delete data[key]
            });
            const updateResault = await CityModel.updateOne({_id: city._id}, {$set: data});           
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("به روزرسانی انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCityById(req, res, next){
        try {
            const { id } = req.params;
            const city = await this.checkExistCity(id);
            const removeResault = await CityModel.deleteOne({_id: city._id});
            if(removeResault.deletedCount == 0) throw createHttpError.InternalServerError("حذف انجام نشضد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "عملیات حذف با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistCity(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه وارد شده اشتباه است");
        const city = await CityModel.findById(id);
        if(!city) throw createHttpError.NotFound("منطقه مورد نظر یافت نشد");
        return city;
    }
}

module.exports = {
    AdminCityController: new AdminCityController()
}
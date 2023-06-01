const { createRecipeEpisodeSchema } = require("../../../Validations/Admin/RecipeVideo.Schema");
const Controller = require("../../Controlle");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration")
const { getTime, copyObject, deleteInvalidPropertyInObject } = require("../../../../Utills/Function");
const { RecipeVideoModel } = require("../../../../Models/RecipeVideo.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { AdminRecipeVideoController } = require("./RecipeVideo.Controller");
const { default: mongoose } = require("mongoose");
 
class AdminRecipeEpisodeController extends Controller{
    async createEpisode(req, res, next){
        try {
            const { title, text, type, filename, fileUploadPath, recipevideoId } = await createRecipeEpisodeSchema.validateAsync(req.body);
            const recipeVideoId = await AdminRecipeVideoController.checkExistRecipeVideoById(recipevideoId)
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const videoUrl = `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const recipeEpisode = {
                title,
                text,
                type,
                time,
                videoAddress
            }
            const updateResault = await RecipeVideoModel.updateOne({_id: recipeVideoId._id}, {
                $push: {
                    episode: recipeEpisode
                }
            });
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ویدیو با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateEpisode(req, res, next){
        try {
            const { episodeId } = req.params;
            const episode = await this.checkExistEpisodeById(episodeId);
            const { fileUploadPath, filename } = req.body;
            let blackListFeilds = ["_id"];
            if(fileUploadPath && filename){
                const fileAddress = path.join(fileUploadPath, filename);
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoUrl = `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds);
                blackListFeilds.push("fileUploadPath");
                blackListFeilds.push("filename");
            } else {
                blackListFeilds.push("videoAddress");
                blackListFeilds.push("time")
            }
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, blackListFeilds);
            const newEpisode = {
                ...episode,
                ...data
            }
            const updateResault = await RecipeVideoModel.updateOne(
                {"episode._id": episode._id}, 
                {$set: {"episode.$": newEpisode}}
                );
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "اپیزود با موفقیت ویرایش شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async removeEpisode(req, res, next){
        try {
            const { episodeId } = req.params;
            const episodeCheck = await this.checkExistEpisodeById(episodeId);
            const removeResault = await RecipeVideoModel.deleteOne({"episode._id": episodeCheck._id}, {
                $pull:{
                    episode: {
                        _id: episodeCheck._id
                    }
                }
            });
            if(removeResault.deletedCount == 0) throw createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "آموزش ویدیویی با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistEpisodeById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const recipeVideo = await RecipeVideoModel.findOne({"episode._id": id});
        if(!recipeVideo) throw createHttpError.NotFound("اپیزود یافت نشد");
        const recipeEpisode = recipeVideo?.episode?.[0];
        if(!recipeEpisode) throw createHttpError.NotFound("اپیزود یافت نشد");
        return copyObject(recipeEpisode)
        

    }
    
}

module.exports = {
    AdminRecipeEpisodeController: new AdminRecipeEpisodeController()
}
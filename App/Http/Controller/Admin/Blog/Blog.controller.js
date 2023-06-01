const Controller = require("../../Controlle");
const { createBlogSchema } = require("../../../Validations/Admin/Blog.Schema");
const path = require("path");
const { BlogModel } = require("../../../../Models/Blog.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { listOfImagesFromRequest, deleteFileInPath, copyObject, deleteInvalidPropertyInObject } = require("../../../../Utills/Function");
const blogBlockList = {
    COMMENTS: "comments",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    VIEW: "view"
};
Object.freeze(blogBlockList);

class AdminBlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            const { title, short_text, text, tags, category, source } = blogDataBody;
            await this.checkExistBlogByTitle(title)
            req.body.images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const images = req.body.images;
            const author = req.user._id;
            const createResault = await BlogModel.create({
              author,
              title,
              short_text,
              text,
              tags,
              category,
              images,
              source
            });
            if(!createResault) throw createHttpError.InternalServerError("خطای سروری از سرآشپز") 
            return res.status(httpStatus.CREATED).json({

                statusCode: httpStatus.CREATED,
                data: {
                    message: "مقاله با موفقیت ثبت شد"
                }
              });
        } catch (error) {
            deleteFileInPath(req?.body?.images)
            next(error)
        }
    }
    async listOfBlog(req, res, next){
        try {
            const blogs = await BlogModel.aggregate([
                {$match: {}},
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $project: {
                        "category.__v": 0,
                        "category.createdAt": 0,
                        "category.updatedAt": 0,
                        "author.otp": 0,
                        "author.password": 0,
                        "author.createdAt": 0,
                        "author.updatedAt": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.__v": 0,
                        "author.roles": 0,
                        "author.email": 0,
                        "author.username": 0,
                        "author.birthday": 0,
                        "author.address": 0,
                        "author.aboutme": 0,
                        "author.Recipe": 0,
                        "author.RecipeVideo": 0
                    }
                }
            ]).sort({_id: -1})
            if(!blogs) throw createHttpError.NotFound("مقاله ای یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.checkExistBlogById(id);
            const resault = await BlogModel.aggregate([
                {$match: {_id: blog._id}},
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $project: {
                        "category.__v": 0,
                        "category.createdAt": 0,
                        "category.updatedAt": 0,
                        "author.otp": 0,
                        "author.password": 0,
                        "author.createdAt": 0,
                        "author.updatedAt": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.__v": 0,
                        "author.roles": 0,
                        "author.email": 0,
                        "author.username": 0,
                        "author.birthday": 0,
                        "author.address": 0,
                        "author.aboutme": 0,
                        "author.Recipe": 0,
                        "author.RecipeVideo": 0
                    }
                }
            ])
            if(!resault) throw createHttpError.NotFound("مقاله ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blog: resault
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlog(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.checkExistBlogById(id);
            const data = copyObject(req.body);
            if(data.fileUploadPath && data.filename){
                data.images = listOfImagesFromRequest(req.files || [], data.fileUploadPath);
            }
            let blackListFeilds = Object.values(blogBlockList);
            deleteInvalidPropertyInObject(data, blackListFeilds)
            const updateResault = await BlogModel.updateOne({_id: blog._id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw createHttpError.InternalServerError("به روز رسانی انجام نشد");
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
    async removeBlog(req, res, next){
        const { id } = req.params;
        const blog = await this.checkExistBlogById(id);
        const deleteResault = await BlogModel.deleteOne({_id: blog._id});
        if(deleteResault.deletedCount == 0) throw createHttpError.InternalServerError("خطای سروری از سرآشپز، حذف مقاله انجام نشد");
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                message: "حذف مقاله با موفقیت انجام شد"
            }
        })
    }
    async checkExistBlogById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه مقاله اشتباه است");
        const blog = await BlogModel.findOne({_id: id});
        if(!blog) createHttpError.NotFound("مقاله مورد نظر یافت نشد");
        return blog;
    }
    async checkExistBlogByTitle(title){
        const blog = await BlogModel.findOne({title});
        if(blog) throw createHttpError.BadRequest("عنوان مقاله قبلا ثبت شده است")
        return blog
    }

}

module.exports = {
    AdminBlogController: new AdminBlogController()
};
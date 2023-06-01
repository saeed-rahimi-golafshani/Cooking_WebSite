const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute(req, file){
    const { title } = req.body;
    if(title) {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth().toString();
        const day = date.getDate().toString();
        const directory = path.join(__dirname, "..", "..", "Public", "Uploads", file, year, month, day, `${title}`);
        req.body.fileUploadPath = path.join("Uploads", file, year, month, day, `${title}`);
        fs.mkdirSync(directory, {recursive: true});
        return directory
    }
    else {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth().toString();
        const day = date.getDate().toString();
        const directory = path.join(__dirname, "..", "..", "Public", "Uploads", file, year, month, day);
        req.body.fileUploadPath = path.join("Uploads", file, year, month, day);
        fs.mkdirSync(directory, {recursive: true});
        return directory    
    }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file?.originalname){
            const filePath = createRoute(req, file.fieldname);
            return cb(null, filePath)
        } 
        cb(null, null)
    },
    filename: (req, file, cb) => {
        if(file?.originalname){
            const ext = path.extname(file.originalname)
            const fileName = String(new Date().getTime()) + ext;
            req.body.filename = fileName;
            return cb(null, fileName);
        } cb(null, null)
    }
});
function imageFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpeg", ".jpg", ".png", ".webp", ".gif", ".jfif"];
    if(mimetypes.includes(ext)){
        return cb(null, true)
    } 
    return cb(createHttpError.BadRequest("فرمت تصویر ارسالی صحیح نمیباشد"))
}
function videoFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".mp4", ".mpg", ".mov", ".avi", ".mkv"];
    if(mimetypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest("فرمت ویدیو ارسالی صحیح نمیباشد"))
}
const maxSize = 1 * 1000 * 1000;
const videoSize = 300 * 1000 * 1000;
const uploadFile = multer({storage, imageFilter, limits: {fileSize: maxSize}});
const uploadVideo = multer({storage, videoFilter, limits: {fileSize: videoSize}});

module.exports = {
    uploadFile,
    uploadVideo
}

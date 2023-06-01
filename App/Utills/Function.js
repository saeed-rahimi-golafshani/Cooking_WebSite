const path = require("path");
const fs = require("fs");

function randomNumberFiveDigitsGenerator(){
    const random = (Math.floor(Math.random() * 90000) + 10000);
    return random
};
function randomNumberFiveDigitsGetDate(){
    const date = new Date();
    const num = date.getTime().toString();
    const randomResault = num.slice(-5);
    return randomResault
}
function getToken(headers){
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if(token && ["Bearer", "bearer"].includes(bearer)) return token
};
function deleteFileInPath(fileAddress){
    if(fileAddress){
        const filePath = path.join(__dirname, "..", "..", "Public", fileAddress);
        fs.unlinkSync(filePath)
    }
};
function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/")))
    } else {
        return []
    }
};
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
};
function deleteInvalidPropertyInObject(data = {}, blackListFeilds = []){
    let nullishData = ["", " ", 0, null, NaN, undefined];
    Object.keys(data).forEach(key => {
        if(blackListFeilds.includes(key)) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if(nullishData.includes(data[key])) delete data[key]; 
    });
    return data
};
function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, second] = String(total).split(".");
    second = Math.round((second * 60) / 100).toString().substring(0, 2);
    let houre = 0;
    if (minutes > 60) {
        total = minutes / 60
         let [h1, m1] = String(total).split(".");
         houre = h1,
         minutes = Math.round((m1 * 60) / 100).toString().substring(0, 2);
    }
    if(String(houre).length == 1) houre = `0${houre}`;
    if(String(minutes).length == 1) minutes = `0${minutes}`;
    if(String(second).length == 1) second = `0${second}`;
    return (houre + ":" + minutes + ":" +second)
}
module.exports = {
    randomNumberFiveDigitsGenerator,
    getToken,
    deleteFileInPath,
    listOfImagesFromRequest,
    copyObject,
    deleteInvalidPropertyInObject,
    getTime
}
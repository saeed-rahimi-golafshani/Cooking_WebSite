const createHttpError = require("http-errors");
const { PermissionModel } = require("../../Models/Permission.Model");
const { RoleModel } = require("../../Models/Role.Model");
const { PERMISSIONS } = require("../../Utills/Constants");

function checkPermission(requiredPermission = []){
    return async function (req, res, next){
        try {
            const allPermissions = requiredPermission.flat(2);
            const user = req.user;
            const role = await RoleModel.findOne({title: user.roles});
            const permissions = await PermissionModel.find({_id: {$in: role.permissions}})
            const userPermissions = permissions.map(item => item.name);
            const hasPermission = allPermissions.every(permission => {
                return userPermissions.includes(permission)
            });
            if(userPermissions.includes(PERMISSIONS.ALL)) return next()
            if(allPermissions.length == 0 || hasPermission) return next()
            throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید")

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    checkPermission
}
const appRoot = require('app-root-path');

const express = require("express");
const router = express.Router();

// const StorageController = require("../api/controllers/system/storage/storage.controller");
// const storageController = new StorageController();

const EmployeeController = require("../api/controllers/system/employee/employee.controller");
const empController = new EmployeeController();

const RoleController = require("../api/controllers/system/role/role.controller");
const roleController = new RoleController();

const AdminController = require("../api/controllers/system/admin/admin.controller");
const adminController = new AdminController();

const FileController = require("../api/controllers/system/file/file.controller");
const fileController = new FileController();

const FileUploadController = require("../api/controllers/system/file/file-upload.controller");
const fileUploadController = new FileUploadController();

const VNLocationController = require("../api/controllers/system/vietnam-location/vn-location.controller");
const vnLocationController = new VNLocationController();

const PromotionController = require("../api/controllers/system/product/promotion.controller");
const promotionController = new PromotionController();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const Auth = require("../api/controllers/auth/auth.controller");
const auth = new Auth();


router
    /**
     * Storage router
     */
    // .post("/storage", auth.isSuperAdmin, storageController.createStorage)
    // .put("/storage", auth.isSuperAdmin, storageController.updateStorage)
    // .get("/storage", auth.isSuperAdmin, storageController.getStorage)
    // .delete("/storage", auth.isSuperAdmin, storageController.deleteStorage)
    // .get("/storage/:_id", auth.isEmployee, storageController.findById)
    /**
     * Admin router
     */
    .post("/admin/employee", auth.isSuperAdmin, adminController.createEmployee)
    .get("/admin/employee", auth.isSuperAdmin, adminController.findEmployeeByParams)
    .delete("/admin/employee", auth.isSuperAdmin, adminController.deleteEmployee)
    .put("/admin/employee", auth.isSuperAdmin, adminController.updateEmployee)
    .get("/admin/role", auth.isSuperAdmin, adminController.getAllRoles)

    /**
     * Employee router
     */
    .put("/employee", auth.isLogin, empController.updateEmployee)
    .get("/employee", auth.isLogin, empController.getInformation)
    .put("/employee/password", auth.isLogin, empController.changePassword)
    /**
     * Auth
     */
    .post("/login", empController.login)
    .get("/logout", empController.logout)
    /**
     * File
     */
    .post("/file", auth.isLogin, fileController.uploadFile, fileUploadController.createFileUpload)
    .get("/file", auth.isLogin, fileController.downloadFile)
    /**
     * VN-location
     */
    .get("/vn-location/province", vnLocationController.getAllProvince)
    .get("/vn-location/district", vnLocationController.getDistrictByProvince)
    .get("/vn-location/ward", vnLocationController.getWardByDistrict)
    /**
    * Promotion
    */
    .get("/promotion", promotionController.getAll)
    .post("/promotion", promotionController.createPromotion)
    .put("/promotion", promotionController.updatePromotion)
    /**
     * VN-location
     */
    .get("/report",
        (req, res, next) => {
            next();
        }, (req, res, next) => {
            res.render(`${appRoot}/public/template/bill.html`, { msg: "Hello world!" });
        })

module.exports = router;
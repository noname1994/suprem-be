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

const ProductController = require("../api/controllers/system/product/product.controller");
const productController = new ProductController();

const CategoryController = require("../api/controllers/system/product/category.controller");
const categoryController = new CategoryController();

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
    .post("/admin/employee", auth.isAuthorization, adminController.createEmployee)
    .get("/admin/employee", auth.isAuthorization, adminController.findEmployeeByParams)
    .delete("/admin/employee", auth.isAuthorization, adminController.deleteEmployee)
    .put("/admin/employee", auth.isAuthorization, adminController.updateEmployee)
    .get("/admin/role", auth.isAuthorization, adminController.getAllRoles)

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
    .post("/file/upload", auth.isAuthorization, fileController.uploadFile, fileUploadController.createFileUpload)
    .get("/file/download", auth.isAuthorization, fileController.downloadFile)
    .get("/file-upload", auth.isAuthorization, fileUploadController.getAllFileUpload)
    .put("/file-upload/banner", auth.isAuthorization, fileUploadController.updateStatusBannerImage)
    .get("/file-upload/banner",  fileUploadController.getAllBanner)
    /**
     * VN-location
     */
    .get("/vn-location/province", vnLocationController.getAllProvince)
    .get("/vn-location/district", vnLocationController.getDistrictByProvince)
    .get("/vn-location/ward", vnLocationController.getWardByDistrict)
    /**
     * Promotion
     */
    .get("/promotion", promotionController.getAllPromotion)
    .post("/promotion", auth.isAuthorization, promotionController.createPromotion)
    .put("/promotion", auth.isAuthorization, promotionController.updatePromotion)
    .delete("/promotion", auth.isAuthorization, promotionController.deletePromotion)
    .get("/promotion/:_id", promotionController.getByIdPromotion)
    /**
     * Product
     */
    .get("/product", productController.getAllProduct)
    .post("/product", auth.isAuthorization, productController.createProduct)
    .put("/product", auth.isAuthorization, productController.updateProduct)
    .delete("/product", auth.isAuthorization, productController.deleteProduct)
    .get("/product/:_id", productController.getByIdProduct)
    /**
     * Category
     */
    .get("/category", categoryController.getAllCategory)
    .post("/category", auth.isAuthorization, categoryController.createCategory)
    .put("/category", auth.isAuthorization, categoryController.updateCategory)
    .delete("/category", auth.isAuthorization, categoryController.deleteCategory)
    .get("/category/:_id", categoryController.getByIdCategory)
    /**
    * VN-location
    */
    .get("/report",
        (req, res, next) => {
            next();
        }, (req, res, next) => {
            res.sendFile(`${appRoot}/public/template/bill.html`, { msg: "Hello world!" });
        })

/**
 * ADMIN MANAGER
 */

module.exports = router;
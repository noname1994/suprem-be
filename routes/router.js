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
    .post("/admin/employee", auth.isSuperAdmin, adminController.createEmployee)
    .get("/admin/employee", auth.isAuthorization, adminController.findEmployeeByParams)
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
    .get("/promotion", auth.isSuperAdmin, promotionController.getAllPromotion)
    .post("/promotion", auth.isSuperAdmin, promotionController.createPromotion)
    .put("/promotion", auth.isSuperAdmin, promotionController.updatePromotion)
    .delete("/promotion", auth.isSuperAdmin, promotionController.deletePromotion)
    .get("/promotion/:_id", auth.isSuperAdmin, promotionController.getByIdPromotion)
    /**
     * Product
     */
    .get("/product", auth.isSuperAdmin, productController.getAllProduct)
    .post("/product", auth.isSuperAdmin, productController.createProduct)
    .put("/product", auth.isSuperAdmin, productController.updateProduct)
    .delete("/product", auth.isSuperAdmin, productController.deleteProduct)
    .get("/product/:_id", auth.isSuperAdmin, productController.getByIdProduct)
    /**
     * Category
     */
    .get("/category", auth.isSuperAdmin, categoryController.getAllCategory)
    .post("/category", auth.isSuperAdmin, categoryController.createCategory)
    .put("/category", auth.isSuperAdmin, categoryController.updateCategory)
    .delete("/category", auth.isSuperAdmin, categoryController.deleteCategory)
    .get("/category/:_id", auth.isSuperAdmin, categoryController.getByIdCategory)
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
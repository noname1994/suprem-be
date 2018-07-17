const appRoot = require('app-root-path');

const CategoryService = require("../../../service/product/category.service");
const categoryService = new CategoryService();

const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

class CategoryController {

    async createCategory(req, res, next) {
        try {
            let _body = req.body;
            let categoryResponse = await categoryService.create(_body);
            let entityResponse = stardardResponse.success(200, categoryResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            let _body = req.body;
            let categoryResponse = await categoryService.update(_body);
            let entityResponse = stardardResponse.success(200, categoryResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            let str = req.query.arrId;
            let arrId = str.split(",");
            let rowResponse = await categoryService.delete(arrId);
            let entityResponse = stardardResponse.success(200, rowResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getAllCategory(req, res, next) {
        try {
            let params = req.query;
            let arrResponse = await categoryService.findAll(params);
            let entityResponse = stardardResponse.success(200, arrResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getByIdCategory(req, res, next) {
        try {
            let _id = req.params._id;
            let categoryResponse = await categoryService.findById(_id);
            let entityResponse = stardardResponse.success(200, categoryResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;
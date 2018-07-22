const ProductService = require("../../../service/product/product.service");
const productService = new ProductService();

const StandardResponse = require("../../../dto/response/standard.res");
const standardResponse = new StandardResponse();

class ProductController {


    async createProduct(req, res, next) {
        try {
            let _body = req.body;
            let productResponse = await productService.create(_body);
            let entityResponse = standardResponse.success(200, productResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            let _body = req.body;
            let productResponse = await productService.update(_body);
            let entityResponse = standardResponse.success(200, productResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            let str = req.arrId;
            let arrId = str.split(",");
            let rawResponse = await productService.delete(arrId);
            let entityResponse = standardResponse.success(200, productResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getAllProduct(req, res, next) {
        try {
            let params = req.query;
            let arrResponse = await productService.findAll(params);
            let entityResponse = standardResponse.success(200, arrResponse);

            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }


    async getByIdProduct(req, res, next) {
        try {
            let _id = req.params._id;
            let productResponse = await productService.findById(_id);
            let entityResponse = standardResponse.success(200, productResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;
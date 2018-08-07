const mongoose = require("mongoose");
const Product = require("../../models/product/product.model");

const CustomizeError = require("../../exception/customize-error");

const ProductDTO = require("../../dto/product/product.dto");
const productDTO = new ProductDTO();

const fieldsCategory = "_id name status";

// const fieldsPromotion = "_id name type percentFormula giftFormula";

const fieldsProduct = "_id name originalPrice";


const TAG = "PRODUCT_SERVICE";

class ProductService {

    async create(_body) {
        try {
            let newProduct = productDTO.infoCreate(_body);

            let name = newProduct.name;
            let tmp = await Product.findOne({ name: name });

            if (tmp) {
                throw new CustomizeError(TAG, 400, `Sản phẩm với tên là "${name}" đã tồn tại !`);
            }

            let product = new Product(newProduct);
            let rs = await product.save();

            let productResponse = productDTO.infoResponse(rs);
            return productResponse;
        } catch (error) {
            throw error;
        }
    }

    async update(_body) {
        try {
            let newProduct = productDTO.infoUpdate(_body);

            let tmp;

            
            let _id = newProduct._id;
            console.log("_id", _id);
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" phải là kiểu ObjectId`);
            }
            tmp = await Product.findById(_id);
            if (!tmp) {
                throw new CustomizeError(TAG, 400, `Sản phẩm cần cập nhật không tồn tại !`);
            }

            let name = newProduct.name;
            tmp = await Product.findOne({ name: name, _id: { $ne: _id } });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `Sản phẩm với tên là "${name}" đã tồn tại !`);
            }

            await Product.updateOne({ _id: _id }, newProduct);

            let rs = await Product.findById(_id)
                .populate({ path: "category", select: fieldsCategory, model: "Category" });;
            let productResponse = productDTO.infoResponse(rs);
            return productResponse;

        } catch (error) {
            throw error;
        }
    }

    async delete(arrId) {
        try {
            let rs = await Product.deleteMany({ _id: { $in: arrId } });
            return rs;
        } catch (error) {
            throw error;
        }
    }

    async removePromotion() {
        try {

        } catch (error) {
            throw error;
        }
    }

    async findAll(params) {
        try {

            let condition = {};

            let pageNum = params.pageNum;
            let pageSize = params.pageSize;

            let limit = Number(pageSize);
            let offset = Number(pageNum) * Number(pageSize);

            let name = params.name;
            if (name) {
                condition.name = new RegExp(name, 'i');
            }

            let status = params.status;
            if (status) {
                condition.status = status;
            }

            let minPrice = params.minPrice || 1000;
            let maxPrice = params.maxPrice;
            if (maxPrice && minPrice) {
                condition.originalPrice = { $lte: maxPrice, $gte: minPrice };
            }

            let total = await Product.count(condition) || 0;

            let rs = await Product.find(condition)
                .populate({ path: "category", select: fieldsCategory, model: "Category" }).limit(limit).skip(offset);
                // .populate({
                //     path: "promotion.information", select: fieldsPromotion, model: "Promotion",
                //     populate: { path: "giftFormula.donatedProduct", select: fieldsProduct, model: "Product" }
                // });

            let arrResponse = rs.map(ele => {
                return productDTO.infoResponse(ele);
            })
            return { total, list: arrResponse };
        } catch (error) {
            throw error;
        }
    }

    async findById(_id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" phải là kiểu ObjectId`);
            }
            let rs = await Product.findById(_id)
                .populate({ path: "category", select: fieldsCategory, model: "Category" });
                // .populate({
                //     path: "promotion.information", select: fieldsPromotion, model: "Promotion",
                //     populate: { path: "giftFormula.donatedProduct", select: fieldsProduct, model: "Product" }
                // });
            if (!rs) {
                throw new CustomizeError(TAG, 400, "Sản phẩm không tồn tại !");
            }
            let productResponse = productDTO.infoResponse(rs);
            return productResponse;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
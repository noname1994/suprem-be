const mongoose = require("mongoose");
const Product = require("../../models/product/product.model");

const CustomizeError = require("../../exception/customize-error");

const ProductDTO = require("../../dto/product/product.dto");
const productDTO = new ProductDTO();

const fieldsCategory = "_id name status";

const fieldsPromotion = "_id name type percent_formula gift_formula";

const fieldsProduct = "_id name original_price";


const TAG = "PRODUCT_SERVICE";

class ProductService {

    async create(_body) {
        try {
            let newProduct = productDTO.infoCreate(_body);



            let name = newProduct.name;
            let tmp = await Product.findOne({ name: name });

            if (tmp) {
                throw new CustomizeError(TAG, 400, `name product = "${name}" is existed !`);
            }

            let product = new Product(newProduct);
            console.log("new : ", product);
            let rs = await product.save();

            let productResponse = productDTO.infoResponse(rs);
            return productResponse;
        } catch (error) {
            throw error;
        }
    }

    async update(_body) {
        try {
            let newProduct = productDTO.infoCreate(_body);

            let tmp;

            let _id = newProduct._id;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
            }
            tmp = await Product.findById(_id);
            if (!tmp) {
                throw new CustomizeError(TAG, 400, `name product = "${name}" is existed !`);
            }

            let name = newProduct.name;
            tmp = await Product.findOne({ name: name, _id: { $ne: _id } });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `name product = "${name}" is existed !`);
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
            let rs = await Product.find()
                .populate({ path: "category", select: fieldsCategory, model: "Category" })
                .populate({
                    path: "promotion.information", select: fieldsPromotion, model: "Promotion",
                    populate: { path: "gift_formula.donated_product", select: fieldsProduct, model: "Product" }
                });

            let arrResponse = rs.map(ele => {
                return productDTO.infoResponse(ele);
            })
            return arrResponse;
        } catch (error) {
            throw error;
        }
    }

    async findById(_id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
            }
            let rs = await Product.findById(_id)
                .populate({ path: "category", select: fieldsCategory, model: "Category" })
                .populate({
                    path: "promotion.information", select: fieldsPromotion, model: "Promotion",
                    populate: { path: "gift_formula.donated_product", select: fieldsProduct, model: "Product" }
                });
            let productResponse = productDTO.infoResponse(rs);
            return productResponse;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
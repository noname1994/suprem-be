const mongoose = require("mongoose");
const Category = require("../../models/product/category.model");

const CategoryDTO = require("../../dto/product/category.dto");
const categoryDTO = new CategoryDTO();

const CustomizeError = require("../../exception/customize-error");

const TAG = "CATEGORY_SERVICE";

class CategoryService {

    async create(_body) {
        try {
            let newCategory = categoryDTO.infoCreate(_body);

            let name = newCategory.name;
            let tmp = await Category.findOne({ name: name });
            if (tmp) {
                throw new CustomizeError(TAG, 400, `category với tên là "${name}" đã tồn tại !`);
            }

            let category = new Category(newCategory);
            await category.save();

            let categoryResponse = categoryDTO.infoResponse(category);
            return categoryResponse;
        } catch (error) {
            throw error;
        }
    }

    async update(_body) {

        try {
            let newCategory = categoryDTO.infoUpdate(_body);
            let tmp;

            let _id = newCategory._id;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new CustomizeError(TAG, 400, `"${_id}" phải là kiểu ObjectId`);
            }

            tmp = await Category.findById(_id);
            if (!tmp) {
                throw new CustomizeError(TAG, 400, "Category không tồn tại !");
            }

            let name = newCategory.name;
            if (name) {
                tmp = await Category.findOne({ name: name, _id: { $ne: _id } });
                if (tmp) {
                    throw new CustomizeError(TAG, 400, `category với tên là "${name}" đã tồn tại !`);
                }
            }

            await Category.updateOne({ _id: _id }, newCategory);

            let rs = await Category.findById(_id);

            let categoryResponse = categoryDTO.infoResponse(rs);
            return categoryResponse;

        } catch (error) {
            throw error;
        }
    }


    async findAll(params) {
        try {
            let condition = {};

            let name = params.name;
            if (name) {
                condition.name = new RegExp(name, 'i');
            }

            let status = params.status;
            if (status) {
                condition.status = status;
            }
            let pageNum = params.pageNum;
            let pageSize = params.pageSize;

            let limit = Number(pageSize);
            let offset = Number(pageNum) * Number(pageSize);

            let total = await Category.count(condition) || 0;

            let rs = await Category.find(condition).limit(limit).skip(offset).exec() || [];

            let arrResponse = rs.map(ele => {
                return categoryDTO.infoResponse(ele);
            })

            return { total, list: arrResponse };
        } catch (error) {
            throw error;
        }
    }

    async delete(arrId) {
        try {
            let rs = await Category.deleteMany({ _id: { $in: arrId } });
            return rs;
        } catch (error) {
            throw error;
        }
    }

    async findById(_id) {
        try {
            let rs = await Category.findById(_id);
            if (!rs) {
                throw new CustomizeError(TAG, 400, "Category không tồn tại !");
            }
            let categoryResponse = categoryDTO.infoResponse(rs);
            return categoryResponse;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryService;
const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const Storage = require("../../models/storage/storage.model");
const CustomizeError = require("../../exception/customize-error");

const StorageDTO = require("../../dto/storage/storage.dto");
const storageDTO = new StorageDTO();


const TAG = "STORAGE_SERVICE";

const fieldsEmployee = "_id fullname phone_number avatar";

class StorageService {

    async create(_body) {
        try {
            let newStorage = storageDTO.infoCreate(_body);
            console.log("newStorage : ", newStorage);
            // check existed name
            let name = newStorage.name;
            let tmp = await Storage.findOne({ name: { $eq: name } });
            if (tmp) {
                let error = new CustomizeError(TAG, 400, `"${name}" is existed`);
                throw error;
            }

            let storage = new Storage(newStorage);
            await storage.save();

            let result = await Storage.findById(storage._id)
                 .populate({ path: "owner", select: fieldsEmployee, model: "Employee" });

            let storageRes = storageDTO.infoRespones(result);
            return storageRes;

        } catch (error) {
            throw error;
        }
    }

    async update(_body) {
        try {
            let newStorage = storageDTO.infoUpdate(_body);

            let _id = newStorage._id;
            let name = newStorage.name;

            // check id format
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                let error = new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
                throw error;
            }

            // check storage exist
            let storage = await Storage.findById(_id);
            if (!storage) {
                let error = new CustomizeError(TAG, 400, "Storage not exist!");
                throw error;
            }

            // check existed name
            let tmp = await Storage.findOne({ _id: { $ne: _id }, name: { $eq: name } });
            if (tmp) {
                let error = new CustomizeError(TAG, 400, `"${name}" is existed`);
                throw error;
            }

            await Storage.updateOne({ _id: _id }, newStorage);

            let result = await Storage.findById(_id)
                 .populate({ path: "owner", select: fieldsEmployee, model: "Employee" });
            
            let storageRes = storageDTO.infoRespones(result);
            return storageRes;

            return rs;
        } catch (error) {
            throw error;
        }

    }

    async delete(arrId) {
        try {
            let rs = await Storage.updateMany({ _id: { $in: arrId } }, { status: "DELETED" });
            return rs;
        } catch (error) {
            throw error;
        }
    }

    async findByParams(params) {
        try {
            let condition = {};

            if (params._id) {
                condition._id = params._id;
            }

            if (params.name) {
                condition.name = new RegExp(params.name, 'i');
            }

            if (params.owner) {
                condition.owner = new RegExp(params.owner, 'i');
            }

            if (params.status) {
                condition.status = params.status;
            }

            let limit = params.pageSize;
            let offset = params.pageNum * params.pageSize;

            let orderBy = params.orderBy;
            let sortBy = orderBy.toUpperCase() == 'DESC' ? '-' + params.sortBy : params.sortBy;

            let result = await Storage.find(condition).sort(sortBy).limit(limit).skip(offset)
                .populate({ path: "owner", select: fieldsEmployee, model: "Employee" });
            // console.log("result : ", result);
            let arrRes = result.map((tmp, i) => {
                return storageDTO.infoRespones(tmp);
            })

            return arrRes;
        } catch (error) {
            throw error;
        }
    }

    async findById(_id) {
        try {

            // check id format
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                let error = new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
                throw error;
            }
            let result = await Storage.findById(_id)
                .populate({ path: "owner", select: fieldsEmployee, model: "Employee" });
            if (!result) {
                let error = new CustomizeError(TAG, 400, "Storage not exist!");
                throw error;
            }
            let storageRes = storageDTO.infoRespones(result);
            return storageRes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = StorageService;
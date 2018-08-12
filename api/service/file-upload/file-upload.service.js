const mongoose = require("mongoose");
const FileUpload = require("../../models/file-upload/file-upload.model");
const FileUploadDTO = require("../../dto/file-upload/file-upload.dto");

const fileUploadDTO = new FileUploadDTO();

const CustoemizeError = require("../../exception/customize-error");

const TAG = "File_UPLOAD_CONTROLLER";

class FileUploadService {

    async createMultil(_body) {
        try {
            let type = _body.type;
            let files = _body.files;
            let arr = files.map(fileUpload => {
                return fileUploadDTO.infoCreate(fileUpload, type);
            })
            let result = await FileUpload.insertMany(arr) || [];
            let arrResponse = result.map(tmp => {
                return fileUploadDTO.infoResponse(tmp);
            })
            return arrResponse;
        } catch (error) {
            throw error;
        }
    }

    async findAll(params) {
        try {

            console.log("params : ", params);

            let condition = {};

            let pageNum = params.pageNum;
            let pageSize = params.pageSize;

            let limit = Number(pageSize);
            let offset = Number(pageNum) * Number(pageSize);

            let type = params.type;
            if (type) {
                condition.type = type;
            }

            let total = await FileUpload.count(condition) || 0;

            let result = await FileUpload.find(condition).sort("-statusImageBanner").limit(limit).skip(offset) || [];

            let arrResponse = result.map(tmp => {
                return fileUploadDTO.infoResponse(tmp);
            })
            let entityResponse = { total, list: arrResponse };
            return entityResponse;
        } catch (error) {
            throw error;
        }
    }

    async updateStatusBanner(bannerId, status) {

        if (!mongoose.Types.ObjectId.isValid(bannerId)) {
            throw new CustomizeError(TAG, 400, `"${bannerId}" phải là kiểu ObjectId`);
        }
        if (status == "SHOW") {
            await FileUpload.updateMany({ type: "IMAGE_BANNER", statusImageBanner: status }, { statusImageBanner: "HIDDEN" });
        }
        let rs = await FileUpload.updateOne({ _id: bannerId }, { statusImageBanner: status });
        return rs;
    }

    async updateStatusImageBanner(arrId, status) {
        try {
            if (arrId) {
                throw new CustoemizeError(TAG, 400, "arrId không tồn tại !");
            }
            if (status == "SHOW") {
                let count = await FileUpload.count(
                    [
                        {
                            type: "IMAGE_BANNER",
                            statusImageBanner: "SHOW"
                        },
                        {
                            type: "IMAGE_BANNER",
                            _id: { $in: arrId }
                        }
                    ]
                );
                if (count > 10) {
                    throw new CustoemizeError(TAG, 400, "Banner Image tối đa được hiển thị là 10 ảnh !");
                }
            }
            let rs = await FileUpload.updateMany({ _id: { $in: arrId } }, { statusImageBanner: status });
            return rs;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = FileUploadService;

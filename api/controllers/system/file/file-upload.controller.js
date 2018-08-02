const StandardRespone = require("../../../dto/response/standard.res");
const standardRespone = new StandardRespone();

const FileUploadService = require("../../../service/file-upload/file-upload.service");
const fileUploadService = new FileUploadService();

class FileUploadController {
    async createFileUpload(req, res, next) {
        try {
            /**
             * body : {type: ?, files : ?}
             */
            let _body = req.body;
            let fileResponse = await fileUploadService.createMultil(_body);
            let entityResponse = standardRespone.success(200, fileResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async getAllFileUpload(req, res, next) {
        try {
            let params = req.query;
            let filesResponse = await fileUploadService.findAll(params);
            let entityResponse = standardRespone.success(200, filesResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }

    async updateStatusBannerImage(req, res, next) {
        try {
            let str = req.query.arrId;
            let status = req.query.status;
            let arrId = str.split(",");
            let rawResponse = await fileUploadService.updateStatusImageBanner(arrId, status);
            let entityResponse = standardRespone.success(200, filesResponse);
            return res.status(200).json(entityResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = FileUploadController;

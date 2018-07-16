const multer = require("multer");
const path = require("path");
const Constant = require("../../../utils/constants");
const fs = require("fs");
const mime = require("mime");
const appRoot = require('app-root-path');

const StandardRespone = require("../../../dto/response/standard.res");
const stardardResponse = new StandardRespone();

const FileUploadDTO = require("../../../dto/file-upload/file-upload.dto");
const fileUploadDTO = new FileUploadDTO;
const TAG = "FILE_CONTROLLER";

// create folder
fs.existsSync(path.join(appRoot.toString(), Constant.imageUploadPath)) || fs.mkdirSync(path.join(appRoot.toString(), Constant.imageUploadPath));
fs.existsSync(path.join(appRoot.toString(), Constant.documentUploadPath)) || fs.mkdirSync(path.join(appRoot.toString(), Constant.documentUploadPath));
fs.existsSync(path.join(appRoot.toString(), Constant.imageAvatarPath)) || fs.mkdirSync(path.join(appRoot.toString(), Constant.imageAvatarPath));
fs.existsSync(path.join(appRoot.toString(), Constant.imageProductPath)) || fs.mkdirSync(path.join(appRoot.toString(), Constant.imageProductPath));
fs.existsSync(path.join(appRoot.toString(), Constant.otherPath)) || fs.mkdirSync(path.join(appRoot.toString(), Constant.otherPath));


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("body: ", file);
        let _body = req.body;
        let type = _body.type || "";
        if (type.toLowerCase() == "avatar") {
            callback(null, Constant.imageAvatarPath);
        } else if (type.toLowerCase() == "image_product") {
            callback(null, Constant.imageProductPath);
        } else if (type.toLowerCase() == "document") {
            callback(null, Constant.documentUploadPath);
        } else {
            callback(null, Constant.otherPath);
        }
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    }
});

class FileController {
    uploadFile(req, res, next) {
        let upload = multer({
            storage: storage,
            fileFilter: (req, file, callback) => {
                let ext = path.extname(file.originalname);
                callback(null, true);
            },
            limits: {
                fileSize: Constant.limitedSizeUpload
            }
        }).any();
        // .array("file", Constant.maximumNumberFileUpload);
        // LƯU Ý : SỬ DỤNG .any() CẦN ĐẶT `type`: trước tất cả các file cần upload
        upload(req, res, err => {

            if (err) {
                next(err);
            } else {
               
                // node : if single type --> req.file : array --> req.files
                if (req.files && req.files.length > 0) {
                    // next  to middware --> save info file to database
                    req.body.files = req.files;
                    next();
                } else {
                    let objecSuccess = stardardResponse.clientError(400, "Not found any file need to upload");
                    res.status(400);
                    return res.json(objecSuccess);
                }
            }
        });
    }

    downloadFile(req, res, next) {
        let pathRequest = req.query.filePath.trim();
        let filePath = "public//" + pathRequest;
        // check file exist
        fs.exists(filePath, isExists => {
            if (isExists) {
                res.download(filePath);
            } else {
                let errorResponse = stardardResponse.clientError(400, `File path '${pathRequest}' not exist`, {});
                res.status(400);
                return res.json(errorResponse);
            }
        });
    }
}

module.exports = FileController;

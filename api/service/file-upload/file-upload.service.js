const FileUpload = require("../../models/file-upload/file-upload.model");
const FileUploadDTO = require("../../dto/file-upload/file-upload.dto");
const fileUploadDTO = new FileUploadDTO();

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
            let entityResponse = result.map(tmp => {
                return fileUploadDTO.infoResponse(tmp);
            })
            return entityResponse;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = FileUploadService;

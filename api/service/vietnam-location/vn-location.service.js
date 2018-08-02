const Province = require("../../models/vietnam-location/province.model");
const District = require("../../models/vietnam-location/district.model");
const Ward = require("../../models/vietnam-location/ward.model");

const CustomizeError = require("../../exception/customize-error");
const TAG = "VN-LOCATION";

class VNLocationService {

    async findAllProvince() {
        try {
            let result = await Province.find();
            if (!result) {
                throw new CustomizeError(TAG, 400, "Không tìm thấy dữ liệu !");
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findDistrictByProvince(provinceId) {
        try {

            if (!provinceId) {
                throw new CustomizeError(TAG, 400, "không tìm thấy provinceId !");
            }

            let result = await District.find({ province: provinceId });
            if (!result) {
                throw new CustomizeError(TAG, 400, "Không tìm thấy dữ liệu !");
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findWardByDistrict(districtId) {
        try {

            if (!districtId) {
                throw new CustomizeError(TAG, 400, "không tìm thấy districtId !");
            }

            let result = await Ward.find({ district: districtId });
            if (!result) {
                throw new CustomizeError(TAG, 400, "Không tìm thấy dữ liệu  !");
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VNLocationService;
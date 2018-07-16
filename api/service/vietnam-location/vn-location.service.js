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
                throw new CustomizeError(TAG, 400, "Not found any province !");
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findDistrictByProvince(provinceId) {
        try {

            if (!provinceId) {
                throw new CustomizeError(TAG, 400, "Not found provinceId !");
            }

            let result = await District.find({ province: provinceId });
            if (!result) {
                throw new CustomizeError(TAG, 400, "Not found any district !");
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findWardByDistrict(districtId) {
        try {

            if (!districtId) {
                throw new CustomizeError(TAG, 400, "Not found districtId !");
            }

            let result = await Ward.find({ district: districtId });
            if (!result) {
                throw new CustomizeError(TAG, 400, "Not found any ward !");
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VNLocationService;
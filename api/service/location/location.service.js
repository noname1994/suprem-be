const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const Location = require("../../models/location/location.model");
const CustomizeError = require("../../exception/customize-error");

const LocationDTO = require("../../dto/location/location.dto");
const locationDTO = new LocationDTO();


const TAG = "LOCATION_SERVICE";

class LocationService {

    async create(_body) {
        try {
            let newLocation = locationDTO.infoCreate(_body);
            // check existed name
            let name = newLocation.name;
            let tmp = await Location.findOne({ name: { $eq: name } });
            if (tmp) {
                let error = new CustomizeError(TAG, 400, `"${name}" is existed`);
                throw error;
            }

            let location = new Location(newLocation);
            let result = await location.save();
            let locationRes = locationDTO.infoRespones(result);
            return locationRes;

        } catch (error) {
            throw error;
        }
    }

    async update(_body) {
        try {
            let newLocation = locationDTO.infoUpdate(_body);

            let _id = newLocation._id;
            let name = newLocation.name;

            // check id format
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                let error = new CustomizeError(TAG, 400, `"${_id}" must be format ObjectId type`);
            }

            // check location exist
            let location = await Location.findById(_id);
            if (!location) {
                let error = new CustomizeError(TAG, 400, "Location not exist!");
                throw error;
            }
            // check existed name
            let tmp = await Location.findOne({ _id: { $ne: _id }, name: { $eq: name } });
            if (tmp) {
                let error = new CustomizeError(TAG, 400, `"${name}" is existed`);
                throw error;
            }

            let rs = Location.updateOne(newLocation);
            let locationRes = locationDTO.infoRespones(rs);
            return locationRes;
        } catch (error) {
            throw error;
        }

    }

    async delete(id) {

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
            let sortBy = orderBy.toUpperCase() == 'DESC'  ? '-' + params.sortBy : params.sortBy;

            let result = await Location.find(condition).sort(sortBy).limit(limit).skip(offset);

            let arrRes = result.map((tmp, i) => {
                return locationDTO.infoRespones(tmp);
            })

            return arrRes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LocationService;
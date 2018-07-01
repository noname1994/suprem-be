const express = require("express");
const router = express.Router();

const LocationController = require("../api/controllers/admin/location/location.controller");
const locationController = new LocationController();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const Auth = require("../api/controllers/auth/auth.controller");
const auth = new Auth();


router
    /**
     * Location router
     */
    .post("/location", auth.isAdmin, locationController.createLocation)
    .put("/location", auth.isAdmin, locationController.updateLocation)
    .get("/location", locationController.getLocation)
    .delete("/location", auth.isAdmin, locationController.deleteLocation)

module.exports = router;
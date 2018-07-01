"use strict";
const fs = require("fs");
const path = require("path");
const basename = path.basename(__dirname);
const mongoose = require("mongoose");
const db = {};
const Schema = mongoose.Schema;

fs.readdirSync(__dirname).filter(folder => {
    console.log("folder : ", folder);
    let dir = path.join(__dirname, folder);
    if (folder != "index.js")
        fs
            .readdirSync(dir)
            .filter(file => {
                console.log("files : ", file);
                return file;
            })
            .forEach(file => {
                console.log("file name : ", file);
                console.log("path : ", path.join(dir, file).toString());
                let model = require(path.join(dir, file));
                let modelSchema = new Schema(model.schema);
                modelSchema.methods = model.methods;
                modelSchema.statics = model.statics;

                db[model.name] = mongoose.model(model.name, modelSchema);
            });
});

module.exports = db;

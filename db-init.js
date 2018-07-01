/**
 * When Server init db-init.js will create fake database
 * disable : edit "start": "nodemon db.init.js ./bin/www"  in pakage.json
 */

const fs = require("fs");
const path = require("path");
const db = require("./api/models/index");

class DatabaseInit {
    init() {
        db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }).then(function (results) {
            db.sequelize.sync({ force: true })
                .then(() => {
                });
        });
    }
}

module.exports = DatabaseInit;


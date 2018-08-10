var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var fs = require("fs");
const appRoot = require('app-root-path');
console.log("environment : ", process.env.NODE_ENV);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//swagger
var swaggerUi = require("swagger-ui-express");
// var swaggerDocument = require("./api/swagger/swagger.json");
// app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// using yaml
const YAML = require("yamljs");
const swaggerDocumentV2 = YAML.load("./api/swagger/swagger.yaml");
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocumentV2));

//winston logger
const winston = require("./config/winston.config");

// setup the logger
app.use(morgan('combined', { stream: winston.stream }))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/manager-system/store-app/", (req, res, next) => {
  res.sendFile(`${appRoot}/public/manager-system/store-app/index.html`);
})


//fifter
const FilterMiddleware = require("./middleware/filter.middleware");
const filterMiddleware = new FilterMiddleware();
app.use(filterMiddleware.filter);
//test api

// routes
const router = require("./routes/router");
app.use("/api/v1", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req.pathname + "   "+ req.originalUrl);
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
var errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const fs = require("fs");
const mysql = require("mysql");
const multer = require("multer");
const formidable = require("formidable");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");
const detailRouter = require("./routes/detail");
const watchRouter = require("./routes/watch");
const profileRouter = require("./routes/profile");

var app = express();

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie",
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }

  console.log("Connected to database");

  let sqls = fs.readFileSync("database/layout.sql").toString().split(";");

  sqls.forEach((sql) => {
    con.query(sql, (err) => {
      if (err) {
        console.log("Error executing SQL:", err);
        return;
      }
      console.log("SQL executed successfully");
    });
  });
});

// Define the destination directory for file uploads
const uploadDestination = path.join(__dirname, "tmp");

// Create the tmp directory if it doesn't exist
if (!fs.existsSync(uploadDestination)) {
  fs.mkdirSync(uploadDestination);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Multer configuration for file upload
const upload = multer({ dest: uploadDestination });
// Route for handling file uploads

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/home", homeRouter);
app.use("/detail", detailRouter);
app.use("/watch", watchRouter);
app.use("/profile", profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

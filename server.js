const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const jwt = require("./middlewares/jwt_auth");
const cors = require("cors");

const UserRoute = require("./routes/UserRoute");
const AuthStudent = require("./routes/AuthStudent");
const StudentRoute = require("./routes/StudentRoute");
const StudentRouteJQuery = require("./routes/StudentRouteJQuery");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "MYKEYSHAJHXANMLAIWSW564643",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/upload", express.static(path.join(__dirname, "public/uploads")));

app.use("/user", UserRoute);
app.use("/", AuthStudent);
app.use("/students", StudentRoute);
// app.use("/studentsJquery", jwt.verifyToken, StudentRouteJQuery);
app.use("/studentsJquery", StudentRouteJQuery);

app.set("view engine", "ejs");
app.set("views", "views");
// app.set("views", path.join(__dirname, "views"));

app.listen(8000, (err) => {
  console.log("App is running on port 8000");
});

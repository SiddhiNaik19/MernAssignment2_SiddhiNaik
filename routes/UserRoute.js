const rt = require("express").Router();
const User = require("../models/User");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { body, validationResult } = require("express-validator");

const options = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype !== "image.jpg" && file.mimetype !== "image/jpeg") {
      cb("Invalid file type");
    }
    // cb("", path.join(__dirname, ".././public/upload"));
    cb("", "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: options });

rt.get("/", (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        res.status(404).send("No users");
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log("Errorr", err);
      res.status(500).send("Error fetcing users");
    });
});

rt.get("/register", (req, res) => {
  res.render("register_user");
});

rt.post(
  "/adduser",
  upload.array("files", 5),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("contact")
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact must be exactly 10 digits"),
    body("files").custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("At least one file must be uploaded");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fileNames = req.files.map((file) => file.filename);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      files: fileNames,
    });

    newUser
      .save()
      .then((user) => {
        if (!user) {
          return res.status(400).send("Error adding user");
        }
        // res.status(200).send(user);
        res.redirect("/user/login");
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        res.status(400).send("Error adding user");
      });
  }
);

rt.get("/login", (req, res) => {
  res.render("login_user");
});

rt.post("/loginPost", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.error("User not found");
        return res.status(401).send("Invalid credentials");
      }

      if (user.password !== password) {
        console.error("Password mismatch");
        return res.status(401).send("Invalid credentials");
      }

      console.log("user", user);
      req.session.user = user;
      res.render("user_profile", { user });
    })
    .catch((err) => {
      console.error("Login error:", err);
      res.status(500).send("Error logging in");
    });
});

rt.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../public/uploads", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("File download error:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

rt.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out");
    }
    res.clearCookie("connect.sid");

    res.redirect("/user/login");
  });
});

module.exports = rt;

const router = require("express").Router();
const Student = require("../models/Student");
const jwt = require("../middlewares/jwt_auth");

router.get("/login", (req, res) => {
  res.render("login_student");
});

// EJS
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Student.findOne({ email, password })
    .then((student) => {
      if (!student) return res.status(404).send("Student Not Found !");
      const token = jwt.generateToken({ email, password });
      console.log("TOKEN : ", token);
      res.redirect("/students");
      //res.status(200).send(token);
    })
    .catch((error) => {
      res.status(500).send("Error Login User : " + error);
    });
});

// jQuery FE
router.post("/loginStudent", (req, res) => {
  const { email, password } = req.body;

  Student.findOne({ email, password })
    .then((student) => {
      console.log("stdujdkjs", student);
      if (!student) return res.status(404).send("Student Not Found !");
      const token = jwt.generateToken({ email, password });
      console.log("TOKEN : ", token);
      res.status(200).send(token);
    })
    .catch((error) => {
      res.status(500).send("Error Login User : " + error);
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/addStudentForm", (req, res) => {
  res.render("addStudent");
});

router.post("/", (req, res) => {
  const student = new Student(req.body);
  student
    .save()
    .then((student) => {
      res.redirect("/students");
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/", (req, res) => {
  Student.find({})
    .then((students) => {
      res.render("studentsList", { students });
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/editForm/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.render("editStudent", { student }))
    .catch((err) => res.status(400).send(err));
});

router.post("/edit/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/students"))
    .catch((err) => res.status(400).send(err));
});

router.get("/delete/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/students"))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;

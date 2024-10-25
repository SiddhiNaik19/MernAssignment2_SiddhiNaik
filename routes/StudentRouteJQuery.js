const router = require("express").Router();
const Student = require("../models/Student");

router.post("/", (req, res) => {
  const student = new Student(req.body);
  student
    .save()
    .then((student) => {
      res.status(200).send(student);
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/", (req, res) => {
  Student.find({})
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/:id", (req, res) => {
  Student.findById({ _id: req.params.id })
    .then((student) => {
      res.status(200).send(student);
    })
    .catch((err) => res.status(400).send(err));
});

router.put("/edit/:id", (req, res) => {
  Student.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((student) => {
      res.status(200).send(student);
    })
    .catch((err) => res.status(400).send(err));
});

router.delete("/delete/:id", (req, res) => {
  Student.findByIdAndDelete({ _id: req.params.id })
    .then((student) => {
      res.status(200).send(student);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;

module.exports = app => {
    const courses = require("../controllers/courses.controller");
  
    var router = require("express").Router();

    router.post("/get", courses.findAll);
    router.post("/", courses.add);
    app.use("/api/courses", router);
  };
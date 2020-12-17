module.exports = app => {
    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();

    router.post("/", user.create); // new use
    router.post("/auth", user.findOne);
    router.put("/", user.update);
    app.use("/api/user", router);
  };
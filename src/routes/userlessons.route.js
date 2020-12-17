module.exports = app => {
    const userlessons = require("../controllers/userlessons.controller");
  
    var router = require("express").Router();

    router.get("/", userlessons.findOne);
    router.post("/", userlessons.create);
    router.put("/", userlessons.update);

    app.use("/api/mylessons", router);
  };
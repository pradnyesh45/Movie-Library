const express = require("express");

const router = express.Router();

const controller = require("../controller/index");

// Home
router.get("/", controller.home);
router.use("/ticket", require("./ticket"));

module.exports = router;

const express = require("express");
const router = express.Router();

const resController = require("../controllers/restaurant-controller");

router.get("/all", resController.getAllRes);

module.exports = router;

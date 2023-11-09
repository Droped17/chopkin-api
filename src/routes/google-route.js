const express = require("express");
const authenticatedMw = require("../middleware/authenticatedMiddleware");
const router = express.Router();

router.post("/getAddress", authenticatedMw);

module.exports = router;

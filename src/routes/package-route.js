const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const packageController = require("../controllers/package-controller");

router.post("/create", upload.single(), packageController.createPackage);

module.exports = router;

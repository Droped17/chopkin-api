const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const packageController = require("../controllers/package-controller");

router.post("/create", upload.single("image"), packageController.createPackage);
router.get("/", packageController.getPackageByRes);
router.post("/createEditPending", packageController.createPackageEditPending);

module.exports = router;

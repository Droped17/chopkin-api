const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const packageController = require("../controllers/package-controller");
const authenticatedMw = require("../middleware/authenticatedMiddleware");

router.post(
  "/create",
  authenticatedMw,
  upload.single("image"),
  packageController.createPackage
);
router.get("/", packageController.getPackageByRes);
router.post(
  "/createEditPending",
  authenticatedMw,
  packageController.createPackageEditPending
);

router.get(
  "/getEditPending",
  authenticatedMw,
  packageController.getEditPending
);
module.exports = router;

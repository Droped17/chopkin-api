const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const packageController = require("../controllers/package-controller");
const authenticatedMw = require("../middleware/authenticatedMiddleware");

router.post("/create/:resId", authenticatedMw, packageController.createPackage);
router.get("/", packageController.getPackageByRes);
router.post(
  "/createEditPending",
  authenticatedMw,
  upload.single("image"),
  packageController.createPackageEditPending
);

router.get(
  "/getEditPending",
  authenticatedMw,
  packageController.getPackagePending
);
router.delete(
  "/delete/:pendingId",
  authenticatedMw,
  packageController.deletePending
);
module.exports = router;

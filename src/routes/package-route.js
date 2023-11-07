const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const packageController = require("../controllers/package-controller");
const authenticatedMw = require("../middleware/authenticatedMiddleware");

router.post("/create/:resId", authenticatedMw, packageController.createPackage);
router.get("/getAll/:resId", packageController.getPackageByRes);
router.post(
  "/createPending",
  authenticatedMw,
  upload.single("image"),
  packageController.createPackagePending
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

router.patch(
  "/updateStatus/:packageId",
  authenticatedMw,
  packageController.updateStatus
);
module.exports = router;

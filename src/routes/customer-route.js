const express = require("express");
const router = express.Router();
const authenticated = require("../middleware/authenticatedMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const customerController = require("../controllers/customer-controller");

router.patch(
  "/",
  authenticated,
  uploadMiddleware.single("profileImg"),
  customerController.updateProfile
);

router.get("/getAll", authenticated, customerController.getAllCus);

module.exports = router;

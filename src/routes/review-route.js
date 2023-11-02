const express = require("express");
const router = express.Router();
const authenticated = require("../middleware/authenticatedMiddleware");

const uploadMiddleware = require("../middleware/uploadMiddleware");

const reviewController = require("../controllers/review-controller");

router.post(
  "/",
  authenticated,
  uploadMiddleware.array("ReviewImages",4),
  reviewController.createReview
);

module.exports = router;

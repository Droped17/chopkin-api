const express = require("express");
const router = express.Router();
const authenticated = require("../middleware/authenticatedMiddleware");

const uploadMiddleware = require("../middleware/uploadMiddleware");

const reviewController = require("../controllers/review-controller");

router.post(
  "/",
  authenticated,
  uploadMiddleware.array("ReviewImages", 4),
  reviewController.createReview
);

router.get("/:id", authenticated, reviewController.getAllReviewByRestaurant);
router.delete("/:reviewId", authenticated, reviewController.deleteReview);

module.exports = router;

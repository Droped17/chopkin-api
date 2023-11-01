const express = require("express");
const router = express.Router();
const authenticated = require('../middleware/authenticatedMiddleware')

const reviewController = require('../controllers/review-controller')

router.post('/review',authenticated,reviewController.createReview )


module.exports = router;

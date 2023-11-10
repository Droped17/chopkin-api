const express = require("express");
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware");
const paymentController = require("../controllers/payment-controller");
const router = express.Router();

router.post("/pay",paymentController.checkoutBooking);


module.exports = router;
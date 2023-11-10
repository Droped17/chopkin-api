const express = require("express");
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware");
const paymentController = require("../controllers/payment-controller");
const router = express.Router();

router.post("/create-checkout-sessions",paymentController.checkoutBooking);
router.patch("/update",paymentController.updatePaymentByPaymentId);


module.exports = router;
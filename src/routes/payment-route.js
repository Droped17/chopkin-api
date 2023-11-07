const express = require("express");
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware");
const paymentController = require("../controllers/payment-controller");
const router = express.Router();




module.exports = router;
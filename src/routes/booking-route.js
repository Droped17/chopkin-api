const express = require('express');
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware")
const booking = require("../controllers/booking-controller");

const router = express.Router()

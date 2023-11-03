const express = require('express');
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware")
const authController = require("../controllers/auth-controller");

const router = express.Router()

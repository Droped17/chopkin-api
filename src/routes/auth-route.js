const express = require('express');
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware")
const authController = require("../controllers/auth-controller");

const router = express.Router()

// router.post('/login', authController.login)
router.post('/register/:usertype', authController.register);
router.post('/create/admin', authController.createAdmin);
router.post('/login', authController.login);
router.get("/user",authenticatedMiddleware,authController.getUser);

module.exports = router
const express = require("express");
const authenticatedMiddleware = require("../middleware/authenticatedMiddleware");
const booking = require("../controllers/booking-controller");

const router = express.Router();

router.post("/create", authenticatedMiddleware, booking.customerCreateBooking);
router.patch("/:bookingId/edit", booking.EditBooking);
router.patch("/updateStatus", booking.updateOrderStatusByBookingId);

router.get("/own", authenticatedMiddleware, booking.getOwnBooking);
router.get("/all", booking.getAllBooking);
router.get("/status/:status", booking.getBookingByStatus);
router.get("/customer/:customerId", booking.getBookingByCustomerId);
router.get("/restaurant/:restaurantId", booking.getBookingByRestaurantId);

router.delete("/delete/:bookingId", booking.deleteBookingById);

module.exports = router;

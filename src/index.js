const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const app = express();

const restaurantRoute = require("../src/routes/restaurant-route");
const chatRoute = require("../src/routes/chat-route");
const notFoundMiddleware = require("../src/middleware/notFoundMiddleware");
const errorMw = require("../src/middleware/errorMiddleware");
const authRoute = require("../src/routes/auth-route");
const packageRoute = require("../src/routes/package-route");
const reviewRoute = require('./routes/review-route');
const bookingRoute = require("./routes/booking-route");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

app.use("/restaurant", restaurantRoute);
app.use("/chat", chatRoute);
app.use("/package", packageRoute);
app.use("/auth", authRoute);
app.use('/review', reviewRoute);
app.use("/booking",bookingRoute);

app.use(notFoundMiddleware);
app.use(errorMw);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server is running on port", port));

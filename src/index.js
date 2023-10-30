const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const app = express();

const restaurantRoute = require("./routes/restaurant-route");
const chatRoute = require("./routes/chat-route");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMw = require("./middleware/errorMiddleware");
const authRoute = require("./routes/auth-routhes");
const packageRoute = require("./routes/package-route");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/restaurant", restaurantRoute);
app.use("/chat", chatRoute);
app.use("/package", packageRoute);
app.use("/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorMw);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server is running on port", port));

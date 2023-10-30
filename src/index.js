const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const app = express();

const restaurantRoute = require("./routes/restaurant-route");

app.use(cors());
app.use(morgan());
app.use(express.json());

app.use("/restaurant", restaurantRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server is running on port", port));

import express = require("express");
import mongoose = require("mongoose");
import cors = require("cors");
import roomRoutes = require("./routes/roomRoutes");
import bookingRoutes = require("./routes/bookingRoutes");
import dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "", {})
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

export = app;

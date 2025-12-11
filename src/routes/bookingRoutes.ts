import express = require("express");
const { createBooking, bookingSummary } = require("../controllers/bookingController");
const router = express.Router();

router.post("/", createBooking);
router.get("/summary", bookingSummary);

export = router;

import mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  guestName: { type: String, required: true },
  nights: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
});

export = mongoose.model("Booking", bookingSchema);

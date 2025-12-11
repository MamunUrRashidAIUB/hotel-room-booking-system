import mongoose = require("mongoose");

const roomSchema=new mongoose.Schema({
  roomNo: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  beds: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
}
);
export = mongoose.model("Room",roomSchema);

import Booking = require("../models/Booking");
import Room = require("../models/Room");
import type { Request, Response } from "express";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, guestName, nights, checkInDate } = req.body;

    const room = await Room.findById(roomId);
    if (!room || !room.available)
      return res.status(400).json({ message: "Room unavailable" });

    const booking = new Booking({ roomId, guestName, nights, checkInDate });
    await booking.save();

    room.available = false;
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: "Error booking room" });
  }
};

const bookingSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Booking.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "room",
        },
      },
      { $unwind: "$room" },
      {
        $group: {
          _id: "$room._id",
          roomNo: { $first: "$room.roomNo" },
          type: { $first: "$room.type" },
          totalNights: { $sum: "$nights" },
        },
      },
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking summary" });
  }
};

export = { createBooking, bookingSummary };

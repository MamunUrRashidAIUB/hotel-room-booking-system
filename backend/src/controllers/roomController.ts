import Room = require("../models/Room");
import type { Request, Response } from "express";

const getRooms = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const rooms = await Room.find().skip(skip).limit(limit);
    const total = await Room.countDocuments();

    res.json({
      rooms,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRooms: total,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

const getRoom = async (req: Request, res: Response) => {
  try {
    console.log("Fetching room with ID:", req.params.id);
    const room = await Room.findById(req.params.id);
    if (!room) {
      console.log("Room not found");
      return res.status(404).json({ message: "Room not found" });
    }
    console.log("Room found:", room);
    res.json(room);
  } catch (err: any) {
    console.error("Error fetching room:", err.message);
    res.status(400).json({ message: "Error fetching room: " + err.message });
  }
};

const createRoom = async (req: Request, res: Response) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: "Error creating room" });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: "Error updating room" });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting room" });
  }
};

export = { getRooms, getRoom, createRoom, updateRoom, deleteRoom };

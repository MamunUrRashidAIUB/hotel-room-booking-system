import Room = require("../models/Room");
import type { Request, Response } from "express";

const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
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

export = { getRooms, createRoom, updateRoom, deleteRoom };

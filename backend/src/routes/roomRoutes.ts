import express = require("express");
const { getRooms, getRoom, createRoom, updateRoom, deleteRoom } = require("../controllers/roomController");
const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export = router;

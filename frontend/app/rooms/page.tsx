"use client";

import { useEffect, useState } from "react";

import RoomCard from "./components/RoomCard";

import api from "../lib/api";
import { Room } from "../types/room";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  const loadRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} reload={loadRooms} />
        ))}
      </div>
    </div>
  );
}

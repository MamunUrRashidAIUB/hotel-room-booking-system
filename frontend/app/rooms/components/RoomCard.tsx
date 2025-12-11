"use client";

import Link from "next/link";


import api from "@/app/lib/api";
import { Room } from "@/app/types/room";

export default function RoomCard({ room, reload }: { room: Room; reload: () => void }) {
  const deleteRoom = async () => {
    if (!confirm(`Are you sure you want to delete Room ${room.roomNo}?`)) {
      return;
    }
    try {
      await api.delete(`/rooms/${room._id}`);
      reload();
    } catch (err) {
      alert("Error deleting room");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Room {room.roomNo}</h2>
      <p>Type: {room.type}</p>
      <p>Beds: {room.beds}</p>
      <p>Price per Night: ${room.pricePerNight}</p>
      <p>Status: {room.available ? "Available" : "Booked"}</p>

      <div className="flex gap-3 mt-3">
        <Link
          className="px-3 py-1 bg-blue-600 text-white rounded"
          href={`/booking/${room._id}`}
        >
          Book
        </Link>

        <Link
          className="px-3 py-1 bg-green-600 text-white rounded"
          href={`/edit-room/${room._id}`}
        >
          Edit
        </Link>

        <button
          onClick={deleteRoom}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

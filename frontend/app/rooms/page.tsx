"use client";

import { useEffect, useState } from "react";

import RoomCard from "./components/RoomCard";

import api from "../lib/api";
import { Room } from "../types/room";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadRooms = async () => {
    const res = await api.get(`/rooms?page=${page}&limit=10`);
    // Handle both old and new API response formats
    if (res.data.rooms) {
      setRooms(res.data.rooms);
      setTotalPages(res.data.pagination.totalPages);
    } else {
      setRooms(res.data);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [page]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} reload={loadRooms} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

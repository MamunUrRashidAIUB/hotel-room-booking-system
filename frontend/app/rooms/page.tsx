"use client";

import { useEffect, useState } from "react";

import RoomCard from "./components/RoomCard";

import api from "../lib/api";
import { Room } from "../types/room";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadRooms = async (page = 1) => {
    setLoading(true);
    const res = await api.get(`/rooms?page=${page}&limit=10`);
    setRooms(res.data.rooms || res.data);
    setCurrentPage(res.data.currentPage || 1);
    setTotalPages(res.data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    loadRooms(currentPage);
  }, [currentPage]);

  const handleOptimisticDelete = (roomId: string) => {
    // Optimistically remove the room from UI
    setRooms((prevRooms) => prevRooms.filter((r) => r._id !== roomId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-gray-200 animate-pulse rounded h-48"></div>
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No rooms available. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <RoomCard 
              key={room._id} 
              room={room} 
              reload={() => loadRooms(currentPage)}
              onOptimisticDelete={handleOptimisticDelete}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

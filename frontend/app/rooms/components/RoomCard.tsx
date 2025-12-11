"use client";

import Link from "next/link";
import { toast } from "react-toastify";

import api from "@/app/lib/api";
import { Room } from "@/app/types/room";

export default function RoomCard({ room, reload, onOptimisticDelete }: { room: Room; reload: () => void; onOptimisticDelete?: (id: string) => void }) {
  const deleteRoom = async () => {
    if (!confirm(`Are you sure you want to delete Room ${room.roomNo}?`)) {
      return;
    }
    
    // Optimistic update: immediately hide the card
    if (onOptimisticDelete) {
      onOptimisticDelete(room._id);
    }
    
    try {
      await api.delete(`/rooms/${room._id}`);
      toast.success(`Room ${room.roomNo} deleted successfully!`);
      reload();
    } catch (err) {
      toast.error("Error deleting room. Refreshing...");
      reload(); // Reload to restore the deleted item
    }
  };

  return (
    <div className="relative overflow-hidden p-3 sm:p-4 rounded-xl flex flex-col gap-2 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-teal-600/20 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'radial-gradient(500px circle at 20% 10%, rgba(168,85,247,0.25), transparent 40%), radial-gradient(600px circle at 80% 90%, rgba(59,130,246,0.25), transparent 40%)'}}></div>

      <h2 className="text-lg sm:text-xl font-semibold text-white/90">Room {room.roomNo}</h2>
      <p className="text-sm sm:text-base text-white/80">Type: {room.type}</p>
      <p className="text-sm sm:text-base text-white/80">Beds: {room.beds}</p>
      <p className="text-sm sm:text-base text-white/80">Price per Night: ${room.pricePerNight}</p>
      <p className="text-sm sm:text-base font-medium"><span className={room.available ? 'text-emerald-300' : 'text-rose-300'}>{room.available ? 'Available' : 'Booked'}</span></p>

      <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
        <Link
          className="relative overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-green-600 text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-white/20 group"
          href={`/booking/${room._id}`}
        >
          <span className="relative z-10">Book</span>
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-300 rounded-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
        </Link>

        <Link
          className="relative overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-blue-600 text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-white/20 group"
          href={`/edit-room/${room._id}`}
        >
          <span className="relative z-10">Edit</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
        </Link>

        <button
          onClick={deleteRoom}
          className="relative overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-red-600 text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-white/20 group"
        >
          <span className="relative z-10">Delete</span>
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-300 rounded-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  );
}

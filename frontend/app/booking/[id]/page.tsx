"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/app/lib/api";
import BookingForm from "./components/BookingForm";

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [room, setRoom] = useState<any>(null);
  const [error, setError] = useState("");

  const loadRoom = async () => {
    try {
      const res = await api.get(`/rooms/${id}`);
      setRoom(res.data);
      
      if (!res.data.available) {
        setError("This room is currently unavailable for booking.");
      }
    } catch (err) {
      setError("Room not found");
    }
  };

  useEffect(() => {
    loadRoom();
  }, [id]);

  if (!room && !error) return <p>Loading...</p>;
  
  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
        <button
          onClick={() => router.push("/rooms")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Book Room {room.roomNo}</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        Type: {room.type} | Beds: {room.beds} | Price: ${room.pricePerNight}
      </p>

      {room.available ? (
        <BookingForm roomId={id} />
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          This room is currently unavailable for booking.
        </div>
      )}
    </div>
  );
}

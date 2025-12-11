"use client";

import { useEffect, useState } from "react";


import api from "@/app/lib/api";
import BookingForm from "./components/BookingForm";

export default function BookingPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<any>(null);

  const loadRoom = async () => {
    const res = await api.get(`/rooms/${params.id}`);
    setRoom(res.data);
  };

  useEffect(() => {
    loadRoom();
  }, []);

  if (!room) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Book Room {room.roomNo}</h1>
      <p className="text-gray-600 mb-4">
        Type: {room.type} | Beds: {room.beds} | Price: ${room.pricePerNight}
      </p>

      <BookingForm roomId={params.id} />
    </div>
  );
}

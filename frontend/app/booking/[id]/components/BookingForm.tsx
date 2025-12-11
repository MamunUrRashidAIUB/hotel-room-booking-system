"use client";

import { useState } from "react";
import api from "../../../../lib/api";

export default function BookingForm({ roomId }: { roomId: string }) {
  const [form, setForm] = useState({
    guestName: "",
    nights: 1,
    checkInDate: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e: any) => {
    e.preventDefault();

    try {
      await api.post("/bookings", { ...form, roomId });
      alert("Booking successful!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error booking room");
    }
  };

  return (
    <form
      onSubmit={submitBooking}
      className="bg-white p-6 shadow rounded max-w-lg flex flex-col gap-4"
    >
      <input
        name="guestName"
        placeholder="Guest Name"
        className="border p-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="nights"
        type="number"
        placeholder="Nights"
        className="border p-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="checkInDate"
        type="date"
        className="border p-2 rounded"
        onChange={handleChange}
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </form>
  );
}

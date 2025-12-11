"use client";

import api from "@/app/lib/api";
import { useState, useMemo } from "react";

// Calculate today's date once
const getTodayString = () => new Date().toISOString().split('T')[0];

export default function BookingForm({ roomId }: { roomId: string }) {
  const minDate = useMemo(() => getTodayString(), []);
  const [form, setForm] = useState({
    guestName: "",
    nights: 1,
    checkInDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (form.nights < 1) {
      alert("Number of nights must be at least 1");
      return;
    }
    
    const checkInDate = new Date(form.checkInDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      alert("Check-in date cannot be in the past");
      return;
    }

    try {
      await api.post("/bookings", { ...form, roomId });
      alert("Booking successful!");
      // Reset form
      setForm({
        guestName: "",
        nights: 1,
        checkInDate: "",
      });
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
        value={form.guestName}
        onChange={handleChange}
        required
        minLength={2}
      />

      <input
        name="nights"
        type="number"
        placeholder="Number of Nights"
        className="border p-2 rounded"
        min="1"
        value={form.nights}
        onChange={handleChange}
        required
      />

      <input
        name="checkInDate"
        type="date"
        className="border p-2 rounded"
        value={form.checkInDate}
        onChange={handleChange}
        required
        min={minDate}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </form>
  );
}

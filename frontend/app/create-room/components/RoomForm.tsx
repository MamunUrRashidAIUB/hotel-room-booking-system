"use client";

import api from "@/app/lib/api";
import { useState } from "react";


export default function RoomForm() {
  const [form, setForm] = useState({
    roomNo: "",
    type: "",
    beds: 1,
    pricePerNight: 0,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (form.beds < 1) {
      alert("Number of beds must be at least 1");
      return;
    }
    if (form.pricePerNight <= 0) {
      alert("Price per night must be greater than 0");
      return;
    }
    
    try {
      await api.post("/rooms", form);
      alert("Room created successfully!");
      // Reset form
      setForm({
        roomNo: "",
        type: "",
        beds: 1,
        pricePerNight: 0,
        description: "",
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating room");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded max-w-lg flex flex-col gap-4"
    >
      <input
        name="roomNo"
        placeholder="Room Number"
        className="border p-2 rounded"
        value={form.roomNo}
        onChange={handleChange}
        required
      />

      <input
        name="type"
        placeholder="Room Type (e.g., Single, Double, Suite)"
        className="border p-2 rounded"
        value={form.type}
        onChange={handleChange}
        required
      />

      <input
        name="beds"
        type="number"
        placeholder="Beds"
        className="border p-2 rounded"
        min="1"
        value={form.beds}
        onChange={handleChange}
        required
      />

      <input
        name="pricePerNight"
        type="number"
        placeholder="Price per Night"
        className="border p-2 rounded"
        min="0.01"
        step="0.01"
        value={form.pricePerNight}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        className="border p-2 rounded"
        value={form.description}
        onChange={handleChange}
        rows={3}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Room
      </button>
    </form>
  );
}

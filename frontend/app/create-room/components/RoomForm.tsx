"use client";

import { useState } from "react";
import api from "../../../lib/api";

export default function RoomForm() {
  const [form, setForm] = useState({
    roomNo: "",
    type: "",
    beds: 1,
    pricePerNight: 0,
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post("/rooms", form);
    alert("Room created!");
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
        onChange={handleChange}
        required
      />

      <input
        name="type"
        placeholder="Room Type"
        className="border p-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="beds"
        type="number"
        placeholder="Beds"
        className="border p-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="pricePerNight"
        type="number"
        placeholder="Price per Night"
        className="border p-2 rounded"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Room
      </button>
    </form>
  );
}

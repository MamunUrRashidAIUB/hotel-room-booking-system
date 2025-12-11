"use client";

import api from "@/app/lib/api";
import { Room } from "@/app/types/room";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditRoomForm({ room }: { room: Room }) {
  const router = useRouter();
  const [form, setForm] = useState({
    roomNo: room.roomNo,
    type: room.type,
    beds: room.beds,
    pricePerNight: room.pricePerNight,
    description: room.description || "",
    available: room.available,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.put(`/rooms/${room._id}`, form);
      alert("Room updated successfully!");
      router.push("/rooms");
    } catch (err) {
      alert("Error updating room");
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
        placeholder="Room Type"
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
        value={form.beds}
        onChange={handleChange}
        required
      />

      <input
        name="pricePerNight"
        type="number"
        placeholder="Price per Night"
        className="border p-2 rounded"
        value={form.pricePerNight}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded"
        value={form.description}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2">
        <input
          name="available"
          type="checkbox"
          checked={form.available}
          onChange={handleChange}
        />
        <span>Available</span>
      </label>

      <div className="flex gap-3">
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Room
        </button>
        <button
          type="button"
          onClick={() => router.push("/rooms")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

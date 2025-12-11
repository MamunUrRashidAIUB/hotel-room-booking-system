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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
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
      await api.put(`/rooms/${room._id}`, form);
      alert("Room updated successfully!");
      router.push("/rooms");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error updating room");
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

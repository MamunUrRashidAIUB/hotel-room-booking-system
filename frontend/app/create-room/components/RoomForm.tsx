"use client";

import api from "@/app/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RoomForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    roomNo: "",
    type: "",
    beds: 1,
    pricePerNight: 0,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post("/rooms", form);
      toast.success("Room created successfully! Redirecting...");
      setTimeout(() => router.push("/rooms"), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating room");
      setLoading(false);
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
        onChange={handleChange}
        value={form.roomNo}
        disabled={loading}
        required
      />

      <input
        name="type"
        placeholder="Room Type"
        className="border p-2 rounded"
        onChange={handleChange}
        value={form.type}
        disabled={loading}
        required
      />

      <input
        name="beds"
        type="number"
        min="1"
        placeholder="Beds"
        className="border p-2 rounded"
        onChange={handleChange}
        value={form.beds}
        disabled={loading}
        required
      />

      <input
        name="pricePerNight"
        type="number"
        min="0"
        placeholder="Price per Night"
        className="border p-2 rounded"
        onChange={handleChange}
        value={form.pricePerNight}
        disabled={loading}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded"
        onChange={handleChange}
        value={form.description}
        disabled={loading}
      />

      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Room"}
      </button>
    </form>
  );
}

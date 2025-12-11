"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import { toast } from "react-toastify";

export default function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params);
  const router = useRouter();

  const [form, setForm] = useState({
    roomNo: "",
    type: "",
    beds: 1,
    pricePerNight: 0,
    description: "",
    available: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        console.log("Fetching room with ID:", roomId);
        const res = await api.get(`/rooms/${roomId}`);
        console.log("Room data:", res.data);
        setForm(res.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching room:", err);
        toast.error(err.response?.data?.message || "Error loading room");
        setTimeout(() => router.push("/rooms"), 2000);
      }
    };
    fetchRoom();
  }, [roomId, router]);

  const handleChange = (e: any) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.put(`/rooms/${roomId}`, form);
      toast.success("Room updated successfully!");
      setTimeout(() => router.push("/rooms"), 1500);
    } catch (err) {
      toast.error("Error updating room");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Room</h1>
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
          required
        />

        <input
          name="type"
          placeholder="Room Type"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.type}
          required
        />

        <input
          name="beds"
          type="number"
          placeholder="Beds"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.beds}
          required
        />

        <input
          name="pricePerNight"
          type="number"
          placeholder="Price per Night"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.pricePerNight}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.description}
        />

        <label className="flex items-center gap-2">
          <input
            name="available"
            type="checkbox"
            onChange={handleChange}
            checked={form.available}
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
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

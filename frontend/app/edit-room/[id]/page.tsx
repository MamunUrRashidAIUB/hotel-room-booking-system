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
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Edit Room</h1>
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-teal-600/20 border border-white/10 p-4 sm:p-6 shadow-2xl rounded-xl w-full max-w-lg flex flex-col gap-3 sm:gap-4"
      >
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{backgroundImage:'radial-gradient(500px circle at 20% 10%, rgba(168,85,247,0.3), transparent 40%), radial-gradient(600px circle at 80% 90%, rgba(59,130,246,0.3), transparent 40%)'}}></div>

        <input
          name="roomNo"
          placeholder="Room Number"
          className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          onChange={handleChange}
          value={form.roomNo}
          required
        />

        <input
          name="type"
          placeholder="Room Type"
          className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          onChange={handleChange}
          value={form.type}
          required
        />

        <input
          name="beds"
          type="number"
          placeholder="Beds"
          className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          onChange={handleChange}
          value={form.beds}
          required
        />

        <input
          name="pricePerNight"
          type="number"
          placeholder="Price per Night"
          className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          onChange={handleChange}
          value={form.pricePerNight}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base min-h-[80px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
          onChange={handleChange}
          value={form.description}
        />

        <label className="relative z-10 flex items-center gap-2 text-sm sm:text-base text-white/90">
          <input
            name="available"
            type="checkbox"
            onChange={handleChange}
            checked={form.available}
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          />
          <span>Available</span>
        </label>

        <div className="relative z-10 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              type="submit"
              className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl border border-white/10 group"
            >
              <span className="relative z-10">Update Room</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/rooms")}
              className="flex-1 relative overflow-hidden bg-gray-600 text-white px-4 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl border border-white/10 group"
            >
              <span className="relative z-10">Cancel</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
            </button>
          </div>
      </form>
    </div>
  );
}

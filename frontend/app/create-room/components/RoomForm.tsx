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
      className="relative overflow-hidden bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-teal-600/20 border border-white/10 p-4 sm:p-6 shadow-2xl rounded-xl w-full max-w-lg flex flex-col gap-3 sm:gap-4"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{backgroundImage:'radial-gradient(500px circle at 20% 10%, rgba(168,85,247,0.3), transparent 40%), radial-gradient(600px circle at 80% 90%, rgba(59,130,246,0.3), transparent 40%)'}}></div>

      <input
        name="roomNo"
        placeholder="Room Number"
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        onChange={handleChange}
        value={form.roomNo}
        disabled={loading}
        required
      />

      <input
        name="type"
        placeholder="Room Type"
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        onChange={handleChange}
        value={form.pricePerNight}
        disabled={loading}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base min-h-[80px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
        onChange={handleChange}
        value={form.description}
        disabled={loading}
      />

      <button 
        className="relative z-10 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 sm:py-3 rounded-lg disabled:opacity-50 transition-all text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl border border-white/10 group"
        disabled={loading}
      >
        <span className=" relative z-10">{loading ? "Creating..." : "Create Room"}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
      </button>
    </form>
  );
}

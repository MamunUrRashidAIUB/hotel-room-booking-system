"use client";

import api from "@/app/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingForm({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [form, setForm] = useState({
    guestName: "",
    nights: "",
    checkInDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/bookings", { ...form, roomId });
      toast.success("Booking successful! Redirecting to rooms...");
      setTimeout(() => router.push("/rooms"), 1500);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Error booking room";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitBooking}
      className="relative overflow-hidden bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-teal-600/20 border border-white/10 p-4 sm:p-6 shadow-2xl rounded-xl w-full max-w-lg flex flex-col gap-3 sm:gap-4"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{backgroundImage:'radial-gradient(500px circle at 20% 10%, rgba(168,85,247,0.3), transparent 40%), radial-gradient(600px circle at 80% 90%, rgba(59,130,246,0.3), transparent 40%)'}}></div>

      {error && (
        <div className="relative z-10 bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
          {error}
        </div>
      )}

      <input
        name="guestName"
        placeholder="Guest Name"
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        onChange={handleChange}
        value={form.guestName}
        required
        disabled={loading}
      />

      <input
        name="nights"
        type="number"
        min="1"
        placeholder="Nights"
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        onChange={handleChange}
        value={form.nights}
        required
        disabled={loading}
      />

      <input
        name="checkInDate"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        className="relative z-10 bg-slate-900/60 border border-white/20 text-white placeholder:text-white/60 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        onChange={handleChange}
        value={form.checkInDate}
        required
        disabled={loading}
      />

      <button
        className="relative z-10 overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 sm:py-3 rounded-lg disabled:opacity-50 transition-all text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl border border-white/10 group"
        disabled={loading}
      >
        <span className="relative z-10">{loading ? "Booking..." : "Book Now"}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
      </button>
    </form>
  );
}

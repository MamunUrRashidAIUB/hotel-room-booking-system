"use client";

import api from "@/app/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingForm({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [form, setForm] = useState({
    guestName: "",
    nights: 1,
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
      className="bg-white p-4 sm:p-6 shadow-lg rounded-lg w-full max-w-lg flex flex-col gap-3 sm:gap-4"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <input
        name="guestName"
        placeholder="Guest Name"
        className="border p-2 sm:p-3 rounded text-sm sm:text-base"
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
        className="border p-2 sm:p-3 rounded text-sm sm:text-base"
        onChange={handleChange}
        value={form.nights}
        required
        disabled={loading}
      />

      <input
        name="checkInDate"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        className="border p-2 sm:p-3 rounded text-sm sm:text-base"
        onChange={handleChange}
        value={form.checkInDate}
        required
        disabled={loading}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 sm:py-3 rounded disabled:bg-gray-400 hover:bg-green-700 transition-colors text-sm sm:text-base"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
}

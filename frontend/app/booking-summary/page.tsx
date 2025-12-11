"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

export default function BookingSummaryPage() {
  const [summary, setSummary] = useState([]);

  const loadSummary = async () => {
    const res = await api.get("/bookings/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Booking Summary</h1>

      <div className="overflow-x-auto w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-teal-600/20 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{backgroundImage:'radial-gradient(500px circle at 20% 10%, rgba(168,85,247,0.3), transparent 40%), radial-gradient(600px circle at 80% 90%, rgba(59,130,246,0.3), transparent 40%)'}}></div>
          
          <table className="w-full relative z-10">
            <thead className="bg-slate-900/60 border-b border-white/10">
              <tr>
                <th className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-white/90 text-left">Room No</th>
                <th className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-white/90 text-left">Type</th>
                <th className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-white/90 text-left">Total Nights Booked</th>
              </tr>
            </thead>

            <tbody>
              {summary.map((item: any, index: number) => (
                <tr 
                  key={item.roomNo} 
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-900/10'}`}
                >
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/80">{item.roomNo}</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/80">{item.type}</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/80">{item.totalNights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

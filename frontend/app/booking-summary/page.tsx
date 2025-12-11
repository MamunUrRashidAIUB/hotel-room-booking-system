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
    <div>
      <h1 className="text-2xl font-bold mb-4">Booking Summary</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Room No</th>
            <th className="p-2">Type</th>
            <th className="p-2">Total Nights Booked</th>
          </tr>
        </thead>

        <tbody>
          {summary.map((item: any) => (
            <tr key={item.roomNo} className="text-center border-t">
              <td className="p-2">{item.roomNo}</td>
              <td className="p-2">{item.type}</td>
              <td className="p-2">{item.totalNights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

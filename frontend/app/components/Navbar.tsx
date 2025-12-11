"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile: Brand + Hamburger */}
        <div className="flex items-center justify-between sm:hidden">
          <Link 
            href="/rooms" 
            className="relative font-bold text-base px-3 py-3 rounded-md transition-all duration-300 hover:text-purple-300 group"
          >
            <span className="relative z-10">Hotel Booking</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/10 transition"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop nav - all items in one line */}
        <div className="hidden sm:flex items-center justify-center gap-6">
          <Link 
            href="/rooms" 
            className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-base sm:text-lg transition-all duration-300 hover:text-purple-300 group"
          >
            <span className="relative z-10">Hotel Booking</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>
          <Link 
            href="/rooms" 
            className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-base sm:text-lg transition-all duration-300 hover:text-purple-300 group"
          >
            <span className="relative z-10">Rooms</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>

          <Link 
            href="/create-room" 
            className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-base sm:text-lg transition-all duration-300 hover:text-purple-300 group"
          >
            <span className="relative z-10">Add Room</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>

          <Link 
            href="/booking-summary" 
            className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-base sm:text-lg transition-all duration-300 hover:text-purple-300 group"
          >
            <span className="relative z-10">Booking Summary</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>
        </div>

        {/* Mobile nav (animated slide panel) */}
        {open && (
          <div className="sm:hidden fixed right-4 top-[60px] w-1/2 z-40">
            <div className="mobile-slide-panel rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl p-3 space-y-2">
              <Link 
                href="/rooms" 
                className="relative block w-full text-center px-4 py-3 font-semibold transition-all duration-300 hover:text-purple-300 group"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10">Rooms</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>

              <Link 
                href="/create-room" 
                className="relative block w-full text-center px-4 py-3 font-semibold transition-all duration-300 hover:text-purple-300 group"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10">Add Room</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>

              <Link 
                href="/booking-summary" 
                className="relative block w-full text-center px-4 py-3 font-semibold transition-all duration-300 hover:text-purple-300 group"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10">Booking Summary</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

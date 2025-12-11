import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Booking System",
  description: "A simple hotel room booking system built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark-bg min-h-screen relative overflow-x-hidden`}
      >
        {/* Decorative background layers */}
        <div className="fixed inset-0 -z-10">
          <div className="vignette" />
          <div className="sparkle" />
        </div>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

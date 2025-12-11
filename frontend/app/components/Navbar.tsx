import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link href="/rooms">Rooms</Link>
      <Link href="/create-room">Add Room</Link>
      <Link href="/booking-summary">Booking Summary</Link>
    </nav>
  );
}

"use client";

import RoomForm from "./components/RoomForm";

export default function CreateRoomPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Create Room</h1>
      <RoomForm />
    </div>
  );
}

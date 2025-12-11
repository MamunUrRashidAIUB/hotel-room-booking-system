"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import EditRoomForm from "./components/EditRoomForm";
import { Room } from "@/app/types/room";

export default function EditRoomPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadRoom = async () => {
    try {
      const res = await api.get(`/rooms/${id}`);
      setRoom(res.data);
    } catch (err) {
      alert("Error loading room");
      router.push("/rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoom();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!room) return <p>Room not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Room {room.roomNo}</h1>
      <EditRoomForm room={room} />
    </div>
  );
}

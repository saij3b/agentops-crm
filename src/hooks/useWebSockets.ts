"use client";

import { useEffect, useState } from "react";

export function useWebSockets() {
  const [status, setStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => setStatus("connected");
    socket.onclose = () => setStatus("disconnected");
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (e) {
        setLastMessage(event.data);
      }
    };

    return () => socket.close();
  }, []);

  return { status, lastMessage };
}

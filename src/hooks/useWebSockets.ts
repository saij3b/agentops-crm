"use client";

import { useEffect, useState } from "react";
import type { AgentRun } from "@/lib/types";

type WebSocketStatus = "connecting" | "connected" | "disconnected";

interface AgentTurnMessage {
  type: "AGENT_TURN";
  agent: string;
  task?: string;
  pr?: string;
  status: AgentRun["status"];
  timestamp: string;
}

type WebSocketMessage = AgentTurnMessage | { type: string; [key: string]: unknown } | string | null;
const websocketUrl = process.env.NEXT_PUBLIC_WS_URL;

function isAgentTurnMessage(value: unknown): value is AgentTurnMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate.type === "AGENT_TURN" &&
    typeof candidate.agent === "string" &&
    typeof candidate.status === "string" &&
    typeof candidate.timestamp === "string"
  );
}

export function useWebSockets() {
  const [status, setStatus] = useState<WebSocketStatus>(websocketUrl ? "connecting" : "disconnected");
  const [lastMessage, setLastMessage] = useState<WebSocketMessage>(null);

  useEffect(() => {
    if (!websocketUrl) {
      setStatus("disconnected");
      return;
    }

    const socket = new WebSocket(websocketUrl);

    socket.onopen = () => setStatus("connected");
    socket.onerror = () => setStatus("disconnected");
    socket.onclose = () => setStatus("disconnected");
    socket.onmessage = (event) => {
      try {
        const data: unknown = JSON.parse(event.data);
        setLastMessage(isAgentTurnMessage(data) ? data : (data as Exclude<WebSocketMessage, string | null>));
      } catch {
        setLastMessage(event.data);
      }
    };

    return () => socket.close();
  }, []);

  return { status, lastMessage };
}

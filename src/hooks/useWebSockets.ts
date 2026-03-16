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
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const [lastMessage, setLastMessage] = useState<WebSocketMessage>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => setStatus("connected");
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

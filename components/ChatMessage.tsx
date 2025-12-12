"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const timeString = message.timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-gradient-to-br from-green-600 to-green-700 text-white rounded-br-sm"
            : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-gray-200"
        )}
      >
        {/* Message content */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-green-100" : "text-gray-500"
          )}
        >
          {timeString}
        </div>
      </div>
    </div>
  );
}
